// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import jetpack from 'fs-jetpack'
import path from 'path'
import { log, isDebug } from '@arken/node/util'
import { decodeItem } from '@arken/node/util/decoder'
// import { transformRequest, transformResponse } from '@w4verse/lite-ui/utils/db'
import { PrismaClient } from './generated'
import { PrismaClient as OldPrismaClient } from './generatedOld'
import claimRequests from '../../data/claimRequests.json'
import guildsData from '../../data/guilds.json'
import guild1OverviewData from '../../data/guilds/1/overview.json'
import guild1MemberwData from '../../data/guilds/1/memberDetails.json'
import referrals from '../../data/affiliate/refers.json'
import trades from '../../data/trades.json'
import oldTrades from '../../data/trades2.json'
import areaNameChoices from '@arken/node/data/generated/areaNameChoices.json'
import skills from '@arken/node/data/generated/skills.json'
import skillMods from '@arken/node/data/generated/skillMods.json'
import skillClassifications from '@arken/node/data/generated/skillClassifications.json'
import skillConditions from '@arken/node/data/generated/skillConditions.json'
import skillStatusEffects from '@arken/node/data/generated/skillStatusEffects.json'
import skillTreeNodes from '@arken/node/data/generated/skillTreeNodes.json'
import characterNameChoices from '@arken/node/data/generated/characterNameChoices.json'
import characterTitles from '@arken/node/data/generated/characterTitles.json'
import characterTypes from '@arken/node/data/generated/characterTypes.json'
import characterAttributes from '@arken/node/data/generated/characterAttributes.json'
import itemSets from '@arken/node/data/generated/itemSets.json'
import itemAttributes from '@arken/node/data/generated/itemAttributes.json'
import itemAttributeParams from '@arken/node/data/generated/itemAttributeParams.json'
import itemRecipes from '@arken/node/data/generated/itemRecipes.json'
import itemRarities from '@arken/node/data/generated/itemRarities.json'
import itemMaterials from '@arken/node/data/generated/itemMaterials.json'
import itemSubTypes from '@arken/node/data/generated/itemSubTypes.json'
import itemSpecificTypes from '@arken/node/data/generated/itemSpecificTypes.json'
import itemSlots from '@arken/node/data/generated/itemSlots.json'
import itemTypes from '@arken/node/data/generated/itemTypes.json'
import gameInfo from '@arken/node/data/generated/gameInfos.json'
import characterClasses from '@arken/node/data/generated/characterClasses.json'
import characterFactions from '@arken/node/data/generated/characterFactions.json'
import characterRaces from '@arken/node/data/generated/characterRaces.json'
import lore from '@arken/node/data/generated/lores.json'
import biomes from '@arken/node/data/generated/biomes.json'
import biomeFeatures from '@arken/node/data/generated/biomeFeatures.json'
import acts from '@arken/node/data/generated/acts.json'
// import areaTypes from '@arken/node/data/generated/areaTypes.json'
import areas from '@arken/node/data/generated/areas.json'
import eras from '@arken/node/data/generated/eras.json'
import timeGates from '@arken/node/data/generated/timeGates.json'
import runeItems from '@arken/node/data/items'
import energies from '@arken/node/data/generated/energies.json'
import npcs from '@arken/node/data/generated/npcs.json'
import planets from '@arken/node/data/generated/planets.json'
import solarSystems from '@arken/node/data/generated/solarSystems.json'
import games from '@arken/node/data/generated/games.json'
import achievements from '../../data/achievements.json'
import * as schemas from '@arken/node/schema/mongoose'
import * as database from '@arken/node/db'

const oldPrisma = new OldPrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_DATABASE_URL,
    },
  },
})

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

class App {
  oldCache: any = {}

  gameNumberToGameId(id: any) {
    return {
      1: this.cache.Game['Arken: Runic Raids'].id,
      2: this.cache.Game['Arken: Evolution Isles'].id,
      3: this.cache.Game['Arken: Infinite Arena'].id,
      4: this.cache.Game['Arken: Guardians Unleashed'].id,
      5: this.cache.Game['Arken: Heart of the Oasis'].id,
    }[id]
  }

  async getGuild(oldId: any, oldGuild: any = null) {
    if (!this.cache.Team[oldId] && oldGuild) {
      this.cache.Team[oldId] = await this.model.Team.create({
        key: oldGuild.key,
        name: oldGuild.name,
        description: oldGuild.description,
        meta: oldGuild,
        status: 'Active',
        ownerId: this.cache.Profile.zen0.id,
        createdById: this.cache.Profile.zen0.id,
        editedById: this.cache.Profile.zen0.id,
      })
    }

    return this.cache.Team[oldId]
  }

  async migrateAccounts() {
    await oldPrisma.$connect()

    const oldAccounts = await oldPrisma.account.findMany()
    console.log(`Number of Prisma v1 accounts to migrate: ${oldAccounts.length}`)

    for (const index in oldAccounts) {
      const oldAccount = oldAccounts[index]

      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
      process.stdout.write(`Progress: ${(parseInt(index) / oldAccounts.length) * 100}%`)

      if (!oldAccount.email) continue

      let newAccount = await this.model.Account.findOne({ username: oldAccount.email })

      if (!newAccount) {
        this.cache.Account[oldAccount.address] = await this.model.Account.create({
          username: oldAccount.email,
          meta: oldAccount.meta,
          status: {
            active: 'Active',
          }[oldAccount.status],
          email: oldAccount.email,
          firstName: oldAccount.firstName,
          lastName: oldAccount.lastName,
          address: oldAccount.address,
          avatar: oldAccount.avatar,
          password: oldAccount.password,
        })
      }
    }
    process.stdout.write('\n')

    const accounts = await prisma.account.findMany()
    console.log(`Number of Prisma v2 accounts to migrate: ${accounts.length}`)

    for (const index in accounts) {
      const account = accounts[index]

      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
      process.stdout.write(`Progress: ${(parseInt(index) / accounts.length) * 100}%`)

      // Check if the account already exists in MongoDB
      const existingAccount = await this.model.Account.findOne({
        $or: [
          { lastName: account.lastName },
          { username: account.lastName },
          { address: account.address },
        ],
      })

      if (existingAccount) {
        // console.log(`Account with key ${account.lastName} already exists.`)
        if (!existingAccount.meta.isLegacyMigrated) {
          existingAccount.meta = account.meta
          existingAccount.meta.isLegacyMigrated = true

          await existingAccount.save()
        }

        this.cache.Account[existingAccount.address] = existingAccount

        continue
      }

      if (!this.cache.Account[account.address]) {
        this.cache.Account[account.address] = await this.model.Account.create({
          username: account.lastName,
          key: account.lastName,
          value: account.value,
          meta: account.meta,
          status: 'Pending',
          email: account.email.replace('rune.farm', 'arken.gg'),
          firstName: account.firstName,
          lastName: account.lastName,
          address: account.address,
          avatar: account.avatar,
          password: account.password,
        })

        console.log(`Inserted account with ID: ${this.cache.Account[account.address].id}`)
      }
    }

    const oldProfiles = await prisma.profile.findMany()
    console.log(`Found ${oldProfiles.length} old profiles`)

    for (const oldProfile of oldProfiles) {
      // @ts-ignore
      let newProfile = await this.model.Profile.findOne({ name: oldProfile.name })

      if (!newProfile && oldProfile?.name) {
        console.log(oldProfile)
        if (!this.cache.Account[oldProfile.address]) {
          this.cache.Account[oldProfile.address] = await this.model.Account.findOne({
            $or: [
              {
                username: oldProfile.name,
              },
              {
                address: oldProfile.address,
              },
            ],
          })

          if (!this.cache.Account[oldProfile.address]) {
            this.cache.Account[oldProfile.address] = await this.model.Account.create({
              username: oldProfile.name,
              meta: oldProfile.meta,
              status: {
                active: 'Active',
              }[oldProfile.status],
              email: oldProfile.address + '@arken.gg',
              firstName: oldProfile.name,
              lastName: oldProfile.address,
              address: oldProfile.address,
              avatar: oldProfile.avatar,
            })
          }
          // oldProfile.meta.characters
        }

        newProfile = await this.model.Profile.create({
          // @ts-ignore
          name: oldProfile.name,
          key: oldProfile.key,
          meta: oldProfile.meta,
          status: { active: 'Active' }[oldProfile.status],
          address: oldProfile.address,
          roleId: this.cache.Role[{ user: 'User' }[oldProfile.role]].id,
          accountId: this.cache.Account[oldProfile.address].id,
          chainId: this.cache.Chain.BSC.id,
          // @ts-ignore
          guildId: await getGuild(oldProfile.meta.guildId).id,
        })

        // @ts-ignore
        if (oldProfile?.meta?.characters) {
          // @ts-ignore
          // console.log(oldProfile.meta.characters)
          // @ts-ignore
          for (const character of oldProfile.meta.characters) {
            // need to hit BSC to figure out the characters token ID so we don't duplicate
            this.cache.Character[character.tokenId] = await this.model.Character.findOne({
              token: character.tokenId,
            })

            if (!this.cache.Character[character.tokenId]) {
              this.cache.Character[character.tokenId] = await this.model.Character.create({
                name: character.name,
                meta: character,
                status: 'Active',
                ownerId: newProfile.id,
                token: character.tokenId,
                classId: this.cache.CharacterClass[character.id],
              })
              console.log(`Inserted character with token: ${character.tokenId}`)
            }
          }
        }
      }

      process.stdout.write('\n')

      const achievements = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/achievements.json`),
        'json'
      )
      const characters = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/characters.json`),
        'json'
      )
      const evolution = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/evolution.json`),
        'json'
      )
      const inventory = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/inventory.json`),
        'json'
      )
      const market = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/market.json`),
        'json'
      )
      const overview = jetpack.read(
        path.resolve(`../../data/users/${newProfile.address}/overview.json`),
        'json'
      )
      console.log(444, achievements, characters, evolution, inventory, market, overview)
    }
  }

  async migrateClaims() {
    // @ts-ignore
    for (const claimRequest of claimRequests) {
      if (!claimRequest) continue

      const profile =
        this.cache.Profile[claimRequest.address] ||
        (await this.model.Profile.findOne({
          address: claimRequest.address,
        }))

      if (!profile) {
        console.log('Profile not found', claimRequest.username, claimRequest.address)
        continue
      }

      this.cache.Payment[claimRequest.id] = await this.model.Payment.findOne({
        key: claimRequest.id,
      })

      if (this.cache.Payment[claimRequest.id]) {
        console.log(`Payment with key ${claimRequest.id} already exists.`)
        continue
      }

      this.cache.Payment[claimRequest.id] = await this.model.Payment.create({
        name: claimRequest.username,
        value: claimRequest.address,
        key: claimRequest.id,
        meta: claimRequest,
        status: claimRequest.status,
        ownerId: profile.id,
      })

      console.log(`Inserted claim request with ID: ${claimRequest.id}`)
    }

    console.log('Done')
  }

  async migrateReferrals() {
    // @ts-ignore
    for (const referral of referrals) {
      const sender = await this.model.Profile.findOne({
        name: referral.referrer,
      })

      const recipient = await this.model.Profile.findOne({
        address: referral.address,
      })

      if (!sender || !recipient) {
        console.log('Sender or recipient not found', referral)
        continue
      }

      const existingReferral = await this.model.Referral.findOne({
        meta: referral,
      })

      if (existingReferral) {
        console.log(
          `Referral already exists with referrer ${referral.referrer} and address ${referral.address}`
        )
        continue
      }

      const status = {
        submitted: 'Pending',
        paying: 'Paying',
      }[referral.status]

      await this.model.Referral.create({
        recipientId: recipient.id,
        senderId: sender.id,
        meta: referral,
        status,
      })

      console.log(`Inserted referral with ID: ${referral.id}`)
    }

    console.log('Done')
  }

  async migrateAssets() {
    console.log('Migrating assets')

    const items = jetpack.read(path.resolve(`../data/items.json`), 'json')

    // @ts-ignore
    for (const item of items) {
      this.oldCache.Asset[item.id] = item

      if (!item.id) continue

      if (this.cache.Asset[item.name]) {
        console.log('Asset ' + item.name + ' already exists')
        continue
      }

      this.cache.Asset[item.name] = await this.model.Asset.create({
        name: item.name,
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      // console.log(asset.id)
    }
  }

  // async migrateGameItems() {
  //   const assets = jetpack.read(path.resolve(`../data/items.json`), 'json')

  //   for (const asset of assets) {
  //     const tokens = jetpack.read(path.resolve(`../data/items/${asset.id}/tokens.json`), 'json')

  //     if (tokens) {
  //       for (const token of tokens) {
  //         if (typeof token === 'string') {
  //           const item = createItem(decodeItem(token))
  //           console.log(item)
  //         } else {
  //           const item = createItem(decodeItem(token.id), token.owner)
  //           console.log(item) create ChainToken and ChainTransaction if possible and attach to Asset
  //         }
  //       }
  //     }
  //   }
  // }

  async createUser(address) {
    // craete account
    // create profile
    // check items
    // check trades
    // const profile = await prisma.profile.create({
    //   data: {
    //     metaverseId: this.cache.Metaverse.Arken.id,
    //
    //     name: item.name,
    //     key: item.id + '',
    //     meta: item,
    //     status: 'Active',
    //
    //     ownerId: profile?.id as never,
    //   },
    // })
    // console.log(profile.id)
  }

  async createItem(item, owner?) {
    const items = jetpack.read(path.resolve(`../data/items.json`), 'json')

    // for (const items of item) {
    //   // @ts-ignore
    //   item.id = guid()

    //   await call({ query: 'createOneGameItem { data }', data: transformRequest(item) })
    // }

    // let profile

    // if (owner) {
    //   profile = prisma.profile.findFirst({ where: { address: owner } })

    //   if (!profile) {
    //     createUser(owner)
    //   }
    // }

    // let asset = await prisma.gameItem.findFirst({ where: { token: item.token } })

    // if (!asset) {
    //   asset = await prisma.gameItem.create({
    //     data: {
    //       name: item.name,
    //       key: item.id + '',
    //       token: item.tokenId,
    //       meta: item,
    //       status: 'Active',
    //
    //       ownerId: profile?.id as never,
    //     },
    //   })

    //   console.log(asset.id)
    // }
  }

  async migrateTrades() {
    // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}
    // {
    //   "id": 1,
    //   "seller": "0x576a83f7B93df7D6BE68A3cfF148eDF9CF77D810",
    //   "buyer": "0x0000000000000000000000000000000000000000",
    //   "tokenId": "10010000210071037103230819",
    //   "price": 0.5,
    //   "status": "available",
    //   "hotness": 0,
    //   "createdAt": 1623829064720,
    //   "updatedAt": 1623829064720,
    //   "lastBlock": 7496648,
    //   "blockNumber": 7496648
    // },
    const profiles = await this.model.Profile.find()
    for (const profile of profiles) {
      // @ts-ignore
      const trades = profile.meta?.market.trades
      if (!trades || !Array.isArray(trades) || trades.length === 0) continue
      console.log(trades)
      return
    }
    // @ts-ignore
    for (const oldTrade of oldTrades) {
      oldTrade.version = 1
      const buyer =
        oldTrade.buyer !== '0x0000000000000000000000000000000000000000'
          ? await this.model.Profile.findOne({
              address: oldTrade.buyer,
            })
          : null
      const owner = await prisma.profile.findFirst({
        where: { address: { equals: oldTrade.owner } },
      })

      // cant find user? look in filesystem
      const decodedItem = decodeItem(oldTrade.tokenId)

      this.cache.Item[decodedItem.token] = await this.model.Item.create({
        chain: this.cache.Chain.BSC.id,
        assetId: this.cache.Asset[decodedItem.name].id,
        key: decodedItem.token,
        meta: decodedItem,
        name: decodedItem.name,
        token: decodedItem.token,
        status: 'Active',
      })

      // const asset = find asset by trade.item.id + ''
      this.cache.Trade[oldTrade.id + ''] = await this.model.Trade.create({
        name: oldTrade.name,
        value: oldTrade.address,
        ownerId: owner.id,
        buyerId: buyer?.id,
        key: oldTrade.id + '',
        meta: oldTrade,
        status: {
          available: 'Available',
          delisted: 'Delisted',
          sold: 'Sold',
        }[oldTrade.status],
      })
    }
  }

  async migrateTeams() {
    console.log('Migrating guilds')
    // const overview = guild1OverviewData

    // "memberCount": 54,
    // "activeMemberCount": 37,
    // "points": 1267,
    // "name": "The First Ones",
    // "description": "Formed after the discovery of a cache of hidden texts in an abandoned, secret Horadric meeting place. This group of scholars was brought together by Bin Zy.",
    // "icon": "https://arken.gg/images/teams/the-first-ones.png",
    // "backgroundColor": "#fff",
    // "discord": { "role": "862170863827025950", "channel": "862153263804448769" },
    const teams = await this.model.Team.find()
    for (const team of teams) {
      if (!this.cache.Team[team.name]) {
        this.cache.Team[team.name] = team
        this.oldCache.Team[team.meta.id] = team
      }
    }

    for (const guild of guildsData) {
      if (this.oldCache.Team[guild.id]) {
        console.log('Guild with name ' + this.oldCache.Team[guild.id].name + ' already exists.')
        continue
      }

      const details = require('../../data/guilds/' + guild.id + '/overview.json')

      this.cache.Team[details.name] = await this.model.Team.find({ name: details.name })

      if (!this.cache.Team[details.name]) {
        this.cache.Team[details.name] = await this.model.Team.create({
          name: details.name,
          description: details.description,
          key: details.name,
          meta: details,
          status: 'Active',
        })
      }

      this.oldCache.Team[guild.id] = this.cache.Team[details.name]

      console.log('Guild with name ' + details.name)

      const memberDetails = require('../../data/guilds/' + guild.id + '/memberDetails.json')

      // {
      //   "address": "0xa94210Bce97C665aCd1474B6fC4e9817a456EECd",
      //   "username": "kucka",
      //   "points": 1,
      //   "achievementCount": 1,
      //   "isActive": true,
      //   "characterId": 6
      // },
      for (const member of memberDetails) {
        const profile = await this.model.Profile.findOne({ address: member.address })

        if (profile) {
          console.log('Character with guild ' + details.name + ' for profile ' + member.address)

          this.cache.Character[profile.id] = await this.model.Character.create({
            teamId: this.cache.Team[details.name].id,
            profileId: profile.id,
            classId: this.cache.Class[member.characterId].id,
          })
        }
      }
    }

    // Use profiles to generate characters
    // character belongs to profile and metaverse
    // metaverse has a parent metaverse (visualize)
    // team uses character
    // metaverse can have a list of products (games)
  }

  async migrateAchievements() {
    // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}

    // {
    //   "id": 1,
    //   "key": "CRAFT_1",
    //   "name": "New Beginnings",
    //   "category": "Basic",
    //   "isEnabled": true,
    //   "icon": "undefinedimages/achievements/blue/s_030.PNG",
    //   "points": 1,
    //   "type": "Crafting",
    //   "isCompleted": false,
    //   "details": { "Date": "Anytime", "Total": 0 },
    //   "branches": { "1": { "description": ["Craft 1 Runeform"] }, "2": { "description": "Craft 1 Runeform" } }
    // },

    const metaverse = await this.model.Metaverse.findOne({ name: 'Arken' })

    if (!metaverse) {
      console.error('Metaverse not found')
      return
    }

    for (const item of achievements) {
      this.oldCache.Achievement[item.id] = item

      if (item.icon) item.icon = item.icon.replace('undefined', '')

      // Check if the achievement already exists in MongoDB
      this.cache.Achievement[item.key] = await this.model.Achievement.findOne({ key: item.key })
      if (this.cache.Achievement[item.key]) {
        console.log(`Achievement with key ${item.key} already exists.`)
        continue
      }

      // Insert the achievement into MongoDB
      this.cache.Achievement[item.key] = await this.model.Achievement.create({
        name: item.name,
        description: '',
        key: item.key,
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      console.log(`Inserted achievement with key: ${item.key}`)
    }
  }

  async migrateAreas() {
    // "uuid": "recCyWeKMWDmMyIxk",
    // "id": 23,
    // "name": "Agrador",
    // "isEnabled": true,
    // "link": "https://arken.gg/zone/agrador",
    // "shortDescription": "The northernmost city in Haerra, a cold and dark place which houses prospectors and fishermen.",
    // "description": "The northernmost city in Haerra, a cold and dark place which houses prospectors and fishermen.\n",
    // "lore1": "## **AGRADOR**\n\nAgrador is the northernmost city in Haerra, sitting on a tongue of land between the Frigid Abyss and Agar-Bassim’s Fjords. It is an impoverished place, mainly inhabited by fishermen who hunt whales, seals, and a wide variety of fish. The city has a small garrison and a large naval base built and serviced by the Radiant Viziers, who control the inland Blackrock Castle. \n\nAlthough Agrador is a port city, few trade routes run through the area, and shipments of foreign goods are few and far in between. The town consists of a number of shops and tradesmen serving the needs of the fishermen, prospectors, and Vizier navy. It is famous for its brothels, gambling establishments, and rough bars that are supposedly run by the Aakschipper, the mythical head of the Haverak Syndicate.\n",
    // "lore2": "## **CESSPOOL OF HAERRA**\n\nDespite housing a garrison and naval base of the Radiant Viziers, Agrador is infested with crime and corruption. Many of the administrators, both city and Vizier, are paid off by the criminal organizations operating within the city. Even those not bribed generally turn a blind eye, as they possess neither the resources nor the steel to bring law and order to the area. As a result, the Haverak Syndicate thrives here with few checks, running smuggling operations down the coast and across the fjords. In Hevane and elsewhere in the south, Agrador is referred to as the “cesspool of Haerra,” and it generally lives up to that name.\n",
    // "lore3": "## **NATURAL BEAUTY**\n\nThough Agrador is riddled with illegal activity and villainy, it is also home to some of the most wondrous winter sights on the continent. As the northernmost city in Haerra, Agrador’s days are blanketed in darkness for most of the year. This allows crystalline views of the multicolored northern lights that often hang heavy in the sky, glowing with vibrant reds, oranges, golds, and pinks. Even the ocean shimmers with light off the coast of Agrador: bioluminescent shrimp and other sea life glitter with greens and blues, creating a brilliant starscape in the surrounding ocean.\n",
    // "lore4": "\n",
    // "types": [16],
    // "npcs": [],
    // "guilds": [],
    // "factions": [],
    // "characters": [],
    // "characterTypes": [5],
    // "timeGates": [],
    // "itemMaterials": [],
    // "biomes": [55, 2]
    for (const item of areas) {
      this.oldCache.Area[item.id] = item

      // Check if the area already exists in MongoDB
      this.cache.Area[item.name] = await this.model.Area.findOne({ name: item.name })
      if (this.cache.Area[item.name]) {
        console.log(`Area with name ${item.name} already exists.`)
        continue
      }

      // Insert the area into MongoDB
      this.cache.Area[item.name] = await this.model.Area.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      // "types": [18],
      // "npcs": [],
      // "guilds": [],
      // "factions": [9],
      // "characters": [],
      // "characterTypes": [4, 5, 8, 9, 13, 14],
      // "timeGates": [],
      // "itemMaterials": [1, 3, 4, 5, 9, 14, 21, 22, 23, 37],
      // "biomes": [6, 13, 14, 15, 22, 24, 27, 58, 59]
    }
  }

  async migrateCharacterAttributes() {
    console.log('Migrating character attributes')

    for (const item of characterAttributes) {
      this.oldCache.CharacterAttribute[item.id] = item
      if (!item.name) continue

      this.cache.CharacterAttribute[item.name] = await this.model.CharacterAttribute.findOne({
        name: item.name,
      })

      if (this.cache.CharacterAttribute[item.name]) {
        console.log(`Character attribute with name ${item.name} already exists.`)
        continue
      }

      this.cache.CharacterAttribute[item.name] = await this.model.CharacterAttribute.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateSkillMods() {
    for (const item of skillMods) {
      this.oldCache.SkillMod[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillMod.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillMod = await this.model.SkillMod.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkillMod.save()
    }
  }

  async migrateSkillClassifications() {
    for (const item of skillClassifications) {
      this.oldCache.SkillClassification[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillClassification.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillClassification = await this.model.SkillClassification.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkillClassification.save()
    }
  }

  async migrateSkillConditions() {
    for (const item of skillConditions) {
      this.oldCache.SkillCondition[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillCondition.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillCondition = await this.model.SkillCondition.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkillCondition.save()
    }
  }
  // async migrateSkillConditionParams() {
  //   for (const item of skillCondition) {
  //     if (!item.name) continue
  //

  //     await prisma.gameSkill.create({
  //       data: {
  //         name: item.name,
  //         description: '',
  //         key: item.id + '',
  //         meta: item,
  //         status: 'Active',
  //
  //       },
  //     })
  //   }
  // }
  async migrateSkillStatusEffects() {
    for (const item of skillStatusEffects) {
      this.oldCache.SkillStatusEffect[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillStatusEffect.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillStatusEffect = await this.model.SkillStatusEffect.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkillStatusEffect.save()
    }
  }

  async migrateSkillTrees() {
    const skillTrees = []

    for (const item of skillTrees) {
      this.oldCache.SkillTree[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillTree.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillTree = await this.model.SkillTree.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkillTree.save()
    }
  }

  async migrateSkillTreeNodes() {
    for (const item of skillTreeNodes) {
      this.oldCache.SkillTreeNode[item.uuid] = item
      if (!item.name) continue

      const existingItem = await this.model.SkillTreeNode.findOne({ name: item.name })
      if (existingItem) continue

      const newSkillTreeNode = await this.model.SkillTreeNode.create({
        name: item.name,
        description: '',
        key: item.name + '',
        meta: item,
        status: 'Active',
      })

      await newSkillTreeNode.save()
    }
  }

  async migrateSkills() {
    for (const item of skills) {
      this.oldCache.Skill[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.Skill.findOne({ name: item.name })
      if (existingItem) continue

      const newSkill = await this.model.Skill.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newSkill.save()
    }
  }

  async migrateItemTransmuteRules() {
    const transmuteRules = [
      { id: 1, name: 'Increase Attribute', chance: 0.1 },
      { id: 1, name: 'Decrease Attribute', chance: 0.01 },
    ]

    for (const item of transmuteRules) {
      if (!item.name) continue

      const existingItem = await this.model.ItemTransmuteRule.findOne({ name: item.name })
      if (existingItem) continue

      const newItemTransmuteRule = await this.model.ItemTransmuteRule.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newItemTransmuteRule.save()
    }
  }

  async migrateCharacterTitles() {
    for (const item of characterTitles) {
      this.oldCache.CharacterTitle[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.CharacterTitle.findOne({ name: item.name })
      if (existingItem) continue

      const newCharacterTitle = await this.model.CharacterTitle.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await newCharacterTitle.save()
    }
  }

  async migrateCharacterTypes() {
    for (const item of characterTypes) {
      this.oldCache.CharacterType[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.CharacterType.findOne({ name: item.name })
      if (existingItem) continue

      const newCharacterType = await this.model.CharacterType.create({
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      await newCharacterType.save()
    }
  }

  async migrateActs() {
    for (const item of acts) {
      this.oldCache.Act[item.id] = item
      const existingItem = await this.model.Act.findOne({ name: item.name })
      if (existingItem) continue

      const newAct = await this.model.Act.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      await newAct.save()
    }
  }

  async migrateEras() {
    for (const item of eras) {
      this.oldCache.Era[item.id] = item

      const existingItem = await this.model.Era.findOne({ name: item.name })
      if (existingItem) continue

      const newEra = await this.model.Era.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      await newEra.save()
    }
  }

  async migratePlanets() {
    for (const item of planets) {
      this.oldCache.Planet[item.id] = item
      const existingItem = await this.model.Planet.findOne({ name: item.name })
      if (existingItem) continue

      const newPlanet = await this.model.Planet.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      await newPlanet.save()
    }
  }

  async migrateSolarSystems() {
    for (const item of solarSystems) {
      this.cache.SolarSystem[item.name] = await this.model.SolarSystem.findOne({ name: item.name })
      this.oldCache.SolarSystem[item.id] = item

      if (this.cache.SolarSystem[item.name]) {
        console.log('SolarSystem ' + item.name + ' already exists')
        continue
      }

      this.cache.SolarSystem[item.name] = await this.model.SolarSystem.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      this.oldCache.SolarSystem[item.id] = item
    }
  }

  async migrateLore() {
    for (const item of lore) {
      this.oldCache.Lore[item.id] = item
      this.cache.Lore[item.name] = await this.model.Lore.findOne({ name: item.name })
      if (this.cache.Lore[item.name]) {
        console.log('Lore ' + item.name + ' already exists')
        continue
      }

      this.cache.Lore[item.name] = await this.model.Lore.create({
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })
    }
  }

  async migrateGames() {
    for (const item of games) {
      this.oldCache.Game[item.id] = item
      this.cache.Game[item.name] = await this.model.Game.findOne({ name: item.name })
      // "uuid": "recHYXHqb8LY3DGsJ",
      // "id": 1,
      // "name": "Arken: Runic Raids",
      // "link": "https://arken.gg/game/raids",
      // "primaryColor": "red",
      // "secondaryColor": "white",
      // "logoLink": "https://arken.gg/images/games/rune-raid-logo.png",
      // "shortDescription": "Arken is an addicting dark fantasy RPG. Play and earn runes (crypto) battling players and AI. Use runes to craft gear (NFTs) to make your character more powerful.",
      // "description": "The Future DeFi and Gaming Ecosystem\n\nHybrid gaming ecosystem which utilizes NFT game assets, seamless integration into a conventional game.\n",
      // "storyline": "",
      // "cmcDescription": "## What is Arken Realm Shards (RXS)?\n\n[Arken Realms](https://coinmarketcap.com/currencies/rxs/) is an open-ended dark fantasy gaming universe built on [Binance Smart Chain](https://coinmarketcap.com/alexandria/article/what-is-binance-smart-chain), where players can battle, join a guild, collect powerful weapons, and earn [NFTs](https://coinmarketcap.com/alexandria/glossary/non-fungible-token) and cryptocurrency in the form of runes by playing.\n\nRunes are small and rare stones inscribed with magical glyphs needed to craft Runeforms (NFTs), weapons, and armor. 33 different Runes are distributed to players over two years. Each Rune has a supply of 100,000 or less, and players can earn Runes by competing against other players, joining guilds, participating in yield farms, and community participation.\n\nThe Rune universe consists of Second Wind, a play-to-earn game, Arken: Runic Raids, the yield farm, Runeforms (NFTs), and the Infinite Arena Arena, a player-versus-player game. The team is also developing the Heart of the Oasis, an MMORPG that will be launched in 2022. Currently, Arken is running on BSC, but the team sees the universe as blockchain-agnostic and is building a bridge to [Polygon](https://coinmarketcap.com/currencies/polygon/).\n\n## Who Are the Founders of Rune?\n\nArken's founders are anonymous. The team chose to stay anonymous to protect itself, its associates, and users from “archaic legislation imposed by governments who won’t understand the emerging DeFi field for years to come.” The team alludes to “Binzy,” which is their fill-in for the person(s) behind Rune, a real software engineer with 20 years of experience and connections in the crypto world.\nIn total, the team consists of 12 people: the lead dev, four unity developers, a React developer, a Solidity developer, two consultant developers, two consultant project managers, one marketing manager, one community manager, four mods and some advisors.\n\n## What Makes Rune Unique?\n\nRune offers an attractive mix of blockchain gaming, NFTs, and elements from decentralized finance. Its universe is split into four different parts.\n\nSecond Wind is a play-to-earn game and was the first game built for the ecosystem. You start as a dragonling that can fly around and eat sprites to evolve into a dragon eventually. One round in the web browser-based game lasts five minutes, and players can earn crypto as a reward.\n\nArken: Runic Raids is the yield farm that attracts liquidity to the ecosystem. You can acquire runes through providing liquidity and raiding farms, i.e., yield farming. The team promises that since the supply of runes is limited, their price should find a bottom. Moreover, each rune has its specific utility, and runes can also be combined to build Runeforms. Furthermore, for 2022, an online RPG built around runes is in development.\n\nRuneforms (NFTs) are unique weapons and armor. Each Runeform is suitable for a specific hero class (seven different hero classes exist) or style of play. Runeforms improve a hero’s capabilities in battle and offer improved farming and merchant abilities. Runeforms are shared, collected, and traded in the Arken Market and players will soon be able to lend them to others. Runeforms are crafted from runes.\n\nFinally, the Infinite Arena Arena is a player-versus-player, web-based 2D topdown game, where you battle your opponents for prizes. Once you defeat an opponent, they go back to the beginning while you can continue the path that goes on infinitely. The last one standing after one minute of battle claims a reward in the form of crypto or NFTs. Every 15 minutes, you enter a new arena.\n",
      // "contracts": "- [0x4596e527eba13a27cd02576d023695eab0a6b210](https://www.bscscan.com/address/0x4596e527eba13a27cd02576d023695eab0a6b210)\n- BSC\n- [0x5fE24631136D570D12920C9Fa0FEcaDA84E47673](https://www.bscscan.com/address/0x5fE24631136D570D12920C9Fa0FEcaDA84E47673)\n- BSC\n- [0xB615023dfa06944B06c4caDB308E6009907E8f4d](https://www.bscscan.com/address/0xB615023dfa06944B06c4caDB308E6009907E8f4d)\n- BSC\n- [0xdAE69A43bC73e662095b488dbDDD1D3aBA59c1FF](https://www.bscscan.com/address/0xdAE69A43bC73e662095b488dbDDD1D3aBA59c1FF)\n- BSC\n- [0xe97a1b9f5d4b849f0d78f58adb7dd91e90e0fb40](https://www.bscscan.com/address/0xe97a1b9f5d4b849f0d78f58adb7dd91e90e0fb40)\n- BSC\n- [0xa9776b590bfc2f956711b3419910a5ec1f63153e](https://www.bscscan.com/address/0xa9776b590bfc2f956711b3419910a5ec1f63153e)\n- BSC\n- [0xcfA857d6EC2F59b050D7296FbcA8a91D061451f3](https://www.bscscan.com/address/0xcfA857d6EC2F59b050D7296FbcA8a91D061451f3)\n- BSC\n- [0x6122F8500e7d602629FeA714FEA33BC2B2e0E2ac](https://www.bscscan.com/address/0x6122F8500e7d602629FeA714FEA33BC2B2e0E2ac)\n- BSC\n- [0x3e151ca82b3686f555c381530732df1cfc3c7890](https://www.bscscan.com/address/0x3e151ca82b3686f555c381530732df1cfc3c7890)\n- BSC\n- [0x2a74b7d7d44025bcc344e7da80d542e7b0586330](https://www.bscscan.com/address/0x2a74b7d7d44025bcc344e7da80d542e7b0586330)\n- BSC\n- [0x60e3538610e9f4974a36670842044cb4936e5232](https://www.bscscan.com/address/0x60e3538610e9f4974a36670842044cb4936e5232)\n- BSC\n- [0x2098fef7eeae592038f4f3c4b008515fed0d5886](https://www.bscscan.com/address/0x2098fef7eeae592038f4f3c4b008515fed0d5886)\n- BSC\n\n"

      // to:
      // key: { type: String, required: true },
      // name: { type: String, required: true },
      // description: { type: String },
      // productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      // ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
      // createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
      // editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
      // deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
      // createdDate: { type: Date, default: Date.now },
      // updatedDate: { type: Date },
      // deletedDate: { type: Date },
      // meta: { type: Object, default: {} },
      // status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
      if (this.cache.Game[item.name]) {
        this.cache.Game[item.name].description = item.description
        this.cache.Game[item.name].meta = item
        this.cache.Game[item.name].status = 'Active'

        await this.cache.Game[item.name].save()

        continue
      }

      if (!this.cache.Application[item.name]) {
        this.cache.Application[item.name] = await this.model.Application.findOne({
          name: item.name,
        }).exec()

        if (!this.cache.Application[item.name]) {
          this.cache.Application[item.name] = await this.model.Application.create({
            metaverseId: this.cache.Metaverse.Arken.id,
            name: item.name,
            key: item.name,
            status: 'Active',
          })
        }
      }

      if (!this.cache.Product[item.name]) {
        this.cache.Product[item.name] = await this.model.Product.findOne({
          name: item.name,
        }).exec()

        if (!this.cache.Product[item.name]) {
          this.cache.Product[item.name] = await this.model.Product.create({
            applicationId: this.cache.Application[this.cache.Game[item.name].applicationId].id, // TODO?? this.cache.Game[item.name].applicationId
            name: item.name,
            key: item.name,
            status: 'Active',
          })
        }
      }

      this.cache.Game[item.name] = await this.model.Game.create({
        productId: this.cache.Game[item.name].id,
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateGuides() {
    console.log('Migrating game guides')
    // Fetch all game guides from Prisma
    // const gameGuides = await prisma.gameGuide.findMany()

    for (const item of gameInfo) {
      this.oldCache.Guide[item.uuid] = item
      // "uuid": "recwto2jjdQAl72Ja",
      // "name": "Game Description",
      // "text": "**Game Objective**\n\nDefeat a continuous stream of player opponents in skill-based gameplay to earn prizes.\n\n\n",
      // "game": 3,
      // "isEnabled": true,
      // "attachments": []
      // Check if the game guide already exists in MongoDB
      this.cache.Guide[item.uuid] = await this.model.Guide.findOne({ key: item.uuid }).exec()

      if (this.cache.Guide[item.uuid]) {
        console.log(`Guide with name ${item.name} already exists.`)
        continue
      }

      // Insert the game guide into MongoDB
      this.cache.Guide[item.uuid] = await this.model.Guide.create({
        gameId: this.gameNumberToGameId(item.game),
        name: item.name,
        description: '',
        content: item.text,
        key: item.uuid,
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
        attachments: item.attachments,
      })

      console.log(`Inserted game guide: ${item.name}`)
    }
  }

  async migrateCharacterClasses() {
    for (const item of characterClasses) {
      if (!item.name) continue

      this.cache.CharacterClass[item.id] = await this.model.CharacterClass.findOne({
        name: item.name,
      })

      if (this.cache.CharacterClass[item.name]) {
        console.log('CharacterClass ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterClass[item.id] = await this.model.CharacterClass.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.isPlayable ? 'Active' : 'Pending',
      })
    }
  }

  async migrateCharacterFactions() {
    for (const item of characterFactions) {
      if (!item.name) continue

      this.cache.CharacterFaction[item.id] = await this.model.CharacterFaction.findOne({
        name: item.name,
      })
      if (this.cache.CharacterFaction[item.name]) {
        console.log('CharacterFaction ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterFaction[item.id] = await this.model.CharacterFaction.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })
    }
  }

  // async  migrateCharacterSpawnRules() {
  //   for (const item of characterRaces) {
  //     if (!item.name) continue

  //

  //     await prisma.gameCharacterRace.create({
  //       data: {
  //         name: item.name,
  //         description: item.description,
  //         key: item.name,
  //         meta: item,
  //         status: item.isPlayable ? 'Active' : 'Pending',
  //
  //       },
  //     })
  //   }
  // }

  // async  migrateCharacterFightingStyles() {
  //   for (const item of characterRaces) {
  //     if (!item.name) continue

  //

  //     await prisma.gameCharacterRace.create({
  //       data: {
  //         name: item.name,
  //         description: item.description,
  //         key: item.name,
  //         meta: item,
  //         status: item.isPlayable ? 'Active' : 'Pending',
  //
  //       },
  //     })
  //   }
  // }

  async migrateAreaNameChoices() {
    for (const item of areaNameChoices) {
      if (!item.name) continue

      this.cache.AreaNameChoice[item.name] = await this.model.AreaNameChoice.findOne({
        name: item.name,
      })
      if (this.cache.AreaNameChoice[item.name]) {
        console.log('AreaNameChoice ' + item.name + ' already exists')
        continue
      }

      this.cache.AreaNameChoice[item.name] = await this.model.AreaNameChoice.create({
        name: item.name,
        key: item.id + '',
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateCharacterNameChoices() {
    for (const item of characterNameChoices) {
      if (!item.name) continue

      this.cache.CharacterNameChoice[item.name] = await this.model.CharacterNameChoice.findOne({
        name: item.name,
      })
      this.oldCache.CharacterNameChoice[item.id] = item

      if (this.cache.CharacterNameChoice[item.name]) {
        console.log('CharacterNameChoice ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterNameChoice[item.name] = await this.model.CharacterNameChoice.create({
        name: item.name,
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      this.oldCache.CharacterNameChoice[item.id] = item
    }
  }
  // async  migrateCharacterMovementStasuses() {
  //   for (const item of characterRaces) {
  //     if (!item.name) continue

  //

  //     await prisma.gameCharacterRace.create({
  //       data: {
  //         name: item.name,
  //         description: item.description,
  //         key: item.name,
  //         meta: item,
  //         status: item.isPlayable ? 'Active' : 'Pending',
  //
  //       },
  //     })
  //   }
  // }

  // async  migrateCharacterPersonalities() {
  //   for (const item of characterRaces) {
  //     if (!item.name) continue

  //

  //     await prisma.gameCharacterRace.create({
  //       data: {
  //         name: item.name,
  //         description: item.description,
  //         key: item.name,
  //         meta: item,
  //         status: item.isPlayable ? 'Active' : 'Pending',
  //
  //       },
  //     })
  //   }
  // }

  async migrateCharacterRaces() {
    for (const item of characterRaces) {
      if (!item.name) continue

      this.cache.CharacterRace[item.name] = await this.model.CharacterRace.findOne({
        name: item.name,
      })
      this.oldCache.CharacterRace[item.id] = item

      if (this.cache.CharacterRace[item.name]) {
        console.log('CharacterRace ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterRace[item.name] = await this.model.CharacterRace.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.isPlayable ? 'Active' : 'Pending',
      })

      this.oldCache.CharacterRace[item.id] = this.cache.CharacterRace[item.name]
    }
  }

  async migrateEnergies() {
    for (const item of energies) {
      if (!item.name) continue

      this.cache.Energy[item.name] = await this.model.Energy.findOne({ name: item.name })

      if (this.cache.Energy[item.name]) {
        console.log('Energy ' + item.name + ' already exists')
        continue
      }

      this.cache.Energy[item.name] = await this.model.Energy.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.Energy[item.id] = this.cache.Energy[item.name]
    }
  }

  async migrateNpcs() {
    for (const item of npcs) {
      if (!item.title) continue

      this.cache.Npc[item.title] = await this.model.Npc.findOne({ name: item.title })
      if (this.cache.Npc[item.title]) {
        console.log('NPC ' + item.title + ' already exists')
        continue
      }

      this.cache.Npc[item.title] = await this.model.Npc.create({
        name: item.title,
        description: item.description,
        key: item.title,
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      this.oldCache.Npc[item.id] = this.cache.Npc[item.title]
    }
  }

  // async migrateAreaTypes() {
  //   for (const item of areaTypes) {
  //     if (!item.name) continue

  //     const existingItem = await this.model.AreaType.findOne({ name: item.name })
  //     if (existingItem) continue

  //     const newAreaType = await this.model.AreaType.create({
  //       name: item.name,
  //       description: item.description,
  //       key: item.name,
  //       meta: item,
  //       status: item.isEnabled ? 'Active' : 'Pending',
  //     })

  //     await newAreaType.save()
  //   }
  // }

  // async migrateAreaLandmarks() {
  //   for (const item of areaLandmarks) {
  //     if (!item.name) continue

  //     const existingItem = await this.model.AreaLandmark.findOne({ name: item.name })
  //     if (existingItem) continue

  //     const area = await this.model.Area.findOne({ key: item.area + '' })

  //     const newAreaLandmark = await this.model.AreaLandmark.create({
  //       name: item.name,
  //       description: item.description,
  //       key: item.name,
  //       meta: item,
  //       status: item.isEnabled ? 'Active' : 'Pending',
  //       areaId: area ? area._id : null,
  //     })

  //     await newAreaLandmark.save()
  //   }
  // }

  async migrateBiomes() {
    for (const item of biomes) {
      if (!item.name) continue

      this.cache.Biome[item.name] = await this.model.Biome.findOne({ name: item.name })
      this.oldCache.Biome[item.id] = this.cache.Biome[item.name]

      if (this.cache.Biome[item.name]) {
        console.log('Biome ' + item.name + ' already exists')
        continue
      }

      this.cache.Biome[item.name] = await this.model.Biome.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.Biome[item.id] = this.cache.Biome[item.name]
    }
  }

  async migrateBiomeFeatures() {
    for (const item of biomeFeatures) {
      if (!item.name) continue

      this.cache.BiomeFeature[item.name] = await this.model.BiomeFeature.findOne({
        name: item.name,
      })
      this.oldCache.BiomeFeature[item.id] = this.cache.BiomeFeature[item.name]

      if (this.cache.BiomeFeature[item.name]) {
        console.log('BiomeFeature ' + item.name + ' already exists')
        continue
      }

      this.cache.BiomeFeature[item.name] = await this.model.BiomeFeature.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.BiomeFeature[item.id] = this.cache.BiomeFeature[item.name]
    }
  }

  async migrateItemSpecificTypes() {
    for (const item of itemSpecificTypes) {
      if (!item.name) continue

      this.cache.ItemSpecificType[item.name] = await this.model.ItemType.findOne({
        name: item.name,
      })
      this.oldCache.ItemSpecificType[item.id] = this.cache.ItemSpecificType[item.name]

      if (this.cache.ItemSpecificType[item.name]) {
        console.log('Item specificType ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSpecificType[item.name] = await this.model.ItemType.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.ItemSpecificType[item.id] = this.cache.ItemSpecificType[item.name]
    }
  }

  async migrateItemTypes() {
    for (const item of itemTypes) {
      if (!item.name) continue

      this.cache.ItemType[item.name] = await this.model.ItemType.findOne({ name: item.name })
      this.oldCache.ItemType[item.id] = this.cache.ItemType[item.name]

      if (this.cache.ItemType[item.name]) {
        console.log('Item type ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemType[item.name] = await this.model.ItemType.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.ItemType[item.id] = this.cache.ItemType[item.name]
    }
  }

  // "items": [
  //   1,
  //   2,
  //   22,
  //   2045,
  //   2046,
  //   182,
  //   209,
  //   612,
  //   2153,
  //   16,
  //   12,
  //   35,
  //   2052,
  //   14,
  //   2037,
  //   2035,
  //   2004,
  //   628,
  //   639
  // ],
  // "subTypes": [
  //   1,
  //   2,
  //   3,
  //   5,
  //   6,
  //   23,
  //   28,
  //   27,
  //   30,
  //   38,
  //   41,
  //   22
  // ],
  // "recipes": [
  //   1,
  //   2,
  //   12,
  //   14,
  //   16,
  //   20
  // ],
  // "slots": [
  //   1,
  //   2
  // ]

  async migrateItemSlots() {
    for (const item of itemSlots) {
      if (!item.name) continue

      this.cache.ItemSlot[item.name] = await this.model.ItemSlot.findOne({ name: item.name })
      this.oldCache.ItemSlot[item.id] = this.cache.ItemSlot[item.name]

      if (this.cache.ItemSlot[item.name]) {
        console.log('Item slot ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSlot[item.name] = await this.model.ItemSlot.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.ItemSlot[item.id] = this.cache.ItemSlot[item.name]
    }
  }

  async migrateItemSubTypes() {
    for (const item of itemSubTypes) {
      if (!item.name) continue

      this.cache.ItemSubType[item.name] = await this.model.ItemSubType.findOne({ name: item.name })
      this.oldCache.ItemSubType[item.id] = this.cache.ItemSubType[item.name]

      if (this.cache.ItemSubType[item.name]) {
        console.log('Item subtype ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSubType[item.name] = await this.model.ItemSubType.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.ItemSubType[item.id] = this.cache.ItemSubType[item.name]
    }
  }

  async migrateItemMaterials() {
    console.log('Migrating item materials')

    for (const item of itemMaterials) {
      if (!item.name) continue

      this.cache.ItemMaterial[item.name] = await this.model.ItemMaterial.findOne({
        name: item.name,
      })
      if (this.cache.ItemMaterial[item.name]) {
        console.log('Item material ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemMaterial[item.name] = await this.model.ItemMaterial.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateItemRarities() {
    for (const item of itemRarities) {
      if (!item.name) continue

      this.cache.ItemRarity[item.name] = await this.model.ItemRarity.findOne({ name: item.name })
      if (this.cache.ItemRarity[item.name]) {
        console.log('Item rarity ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemRarity[item.name] = await this.model.ItemRarity.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateItemRecipes() {
    console.log('Migrating item recipes')

    for (const item of itemRecipes) {
      if (!item.name) continue

      this.cache.ItemRecipe[item.name] = await this.model.ItemRecipe.findOne({ name: item.name })
      if (this.cache.ItemRecipe[item.name]) {
        console.log('Item recipe ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemRecipe[item.name] = await this.model.ItemRecipe.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateItemSets() {
    for (const item of itemSets) {
      if (!item.name) continue

      this.cache.ItemSet[item.name] = await this.model.ItemSet.findOne({ name: item.name })
      if (this.cache.ItemSet[item.name]) {
        console.log('Item set ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSet[item.name] = await this.model.ItemSet.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateItemAttributes() {
    console.log('Migrating item attributes')

    for (const item of itemAttributes) {
      if (!item.name) continue

      this.cache.ItemAttribute[item.name] = await this.model.ItemAttribute.findOne({
        name: item.name,
      })
      if (this.cache.ItemAttribute[item.name]) {
        console.log('Item attribute ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemAttribute[item.name] = await this.model.ItemAttribute.create({
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  // async migrateItemAttributeParams() {
  //   for (const item of itemAttributeParams) {
  //     if (!item.name) continue

  //

  //     await prisma.gameItemAttributeParam.create({
  //       data: {
  //         name: item.name,
  //         description: '',
  //         key: item.name,
  //         meta: item,
  //         status: 'Active',
  //
  //       },
  //     })
  //   }
  // }

  async migrateBounties() {
    const bounties = [
      {
        name: 'Document Arken Realms on Wikipedia',
        reward: '50 ZOD',
        status: 'Active', // 'Ready to be accepted, ask in Telegram.'
        claimedBy: 'Nobody yet.',
        description:
          "We would like our status, accomplishments and games documented on wikipedia. It should be done in a professional manner. In particular, we'd like our world first's documented, like being the first interoperable game model to utilize the same NFTs across games.",
      },
      {
        name: 'List Second Wind on various game listing sites',
        reward: '50 ZOD',
        status: 'Paused', // 'Paused. Wait for Evo 2 and free account system.',
        claimedBy: 'Nobody yet.',
        description:
          'We would like Second Wind listed across as many gaming sites as possible. A minimum of 20 high-quality sites would be best.',
      },
      {
        name: 'Categorize AI generated items into mythic/epic/rare/magical',
        reward: '2 ZOD per item',
        status: 'Paused', //'Paused. Wait for more items to be generated (October).',
        claimedBy: 'Nobody yet.',
        description:
          'We need help determining the quality of the AI at generated for our Runeform items. Mythics would be the most unique and high quality. Epics would be high quality and slightly unique or a bit less quality but very unique. Rare would be high quality and not unique at all, or low quality and very unique. Magical would be a mix of low quality or low uniqueness, but with some nice ones spread in there for RNG.\n\nThe operation is easy on a technical level, simply download a ZIP folder of the items and move them to the folder based on your judgment.',
      },
    ]

    for (const item of bounties) {
      if (!item.name) continue

      this.cache.Bounty[item.name] = await this.model.Bounty.findOne({ name: item.name })
      if (this.cache.Bounty[item.name]) {
        console.log('Bounty ' + item.name + ' already exists')
        continue
      }

      this.cache.Bounty[item.name] = await this.model.Bounty.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.status,
      })
    }
  }

  async migratePolls() {
    const polls = []

    for (const item of polls) {
      if (!item.name) continue

      this.cache.Poll[item.name] = await this.model.Poll.findOne({ name: item.name })
      if (this.cache.Poll[item.name]) {
        console.log('Poll ' + item.name + ' already exists')
        continue
      }

      this.cache.Poll[item.name] = await this.model.Poll.create({
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  usernameToProfileId = {
    Matheus: '',
    Binzy: '',
    Lazy: '',
    Discomonk: '',
    FireLord: '',
    SamKouCaille: '',
    Ekke: '',
    Riccardo: '',
    Maiev: '',
    Monk: '',
    Sam: '',
    Jon: '',
    Scrooge: '',
  }

  async findProfileIdByUsername(username) {
    if (this.usernameToProfileId[username]) return this.usernameToProfileId[username]
    this.usernameToProfileId[username] = (await this.model.Profile.find({ name: username })).id
    return this.usernameToProfileId[username]
  }

  async migrateRaffles() {
    const raffles = [
      {
        name: '#1 (August, 2022)',
        status: 'Finished',
        rewards: [
          {
            name: `50 Zavox Tickets`,
            key: '50-zavox',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Matheus'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Discomonk'), amount: 20 },
              { ownerId: await this.findProfileIdByUsername('FireLord'), amount: 40 },
              { ownerId: await this.findProfileIdByUsername('SamKouCaille'), amount: 50 },
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 55 },
            ],
          },
          {
            name: `Giveaway Item`,
            key: 'giveaway-item',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('SamKouCaille'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('SamKouCaille'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 1 },
            ],
            content: `Item from the Giveaway Wallet that wasn't given away. Time to search the inventory..`,
          },
          {
            name: `Diablo 2 Item`,
            key: 'd2-item',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Riccardo'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 20 },
              { ownerId: await this.findProfileIdByUsername('FireLord'), amount: 40 },
              { ownerId: await this.findProfileIdByUsername('Monk'), amount: 50 },
              { ownerId: await this.findProfileIdByUsername('Discomonk'), amount: 60 },
              { ownerId: await this.findProfileIdByUsername('Riccardo'), amount: 160 },
            ],
            content: `Fundraiser item that has been purchased by Binzy using the dev cut.`,
          },
          {
            name: `Zavox Ticket`,
            key: '1-zavox',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Matheus'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 2 },
            ],
            content: `You definitely like RNG.`,
          },
          {
            name: `Character Slot Redemption Scroll`,
            key: 'character-slot',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Matheus'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('SamKouCaille'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 2 },
            ],
            content: `This is the same scroll that's transmuted using 1 ZOD.`,
          },
          {
            name: `Dev Fee Acquisition`,
            key: 'dev-fee',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [{ raffleRequirement: { key: 'noWinsThisYear' } }],
            winnerId: await this.findProfileIdByUsername('Maiev'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 20 },
              { ownerId: await this.findProfileIdByUsername('Monk'), amount: 70 },
              { ownerId: await this.findProfileIdByUsername('Discomonk'), amount: 80 },
              { ownerId: await this.findProfileIdByUsername('Maiev'), amount: 100 },
            ],
            content: `You'll receive 0.1% of all RXS transactions for the next month. Yum.`,
          },
        ],
      },
      {
        name: '#2 (September, 2022)',
        status: 'Finished',
        rewards: [
          {
            name: `20 Zavox Tickets`,
            key: '20-zavox',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Monk'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Sam'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Jon'), amount: 20 },
              { ownerId: await this.findProfileIdByUsername('Monk'), amount: 30 },
              { ownerId: await this.findProfileIdByUsername('Disco'), amount: 30 },
              { ownerId: await this.findProfileIdByUsername('FireLord'), amount: 31 },
              { ownerId: await this.findProfileIdByUsername('Scrooge'), amount: 51 },
              { ownerId: await this.findProfileIdByUsername('Monk'), amount: 53 },
            ],
            content: `That's a lot of Zavox, think of the possibilities...`,
          },
          {
            name: `Giveaway Item`,
            key: 'giveaway-item',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Lazy'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 5 },
            ],
            content: `Item from the Giveaway Wallet that wasn't given away. Time to search the inventory..`,
          },
          {
            name: `$100 Cash`,
            key: '100-cash',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [
              {
                raffleRequirement: {
                  key: 'won1PreviousReward',
                },
              },
            ],
            winnerId: await this.findProfileIdByUsername('Maiev'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Riccardo'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Sam'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Maiev'), amount: 20 },
            ],
            content: `We're talking cold hard cash here...`,
          },
          {
            name: `Zavox Ticket`,
            key: '1-zavox',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Matheus'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Ekke'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Disco'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 2 },
            ],
            content: `You definitely like RNG.`,
          },
          {
            name: `Character Slot Redemption Scroll`,
            key: 'character-slot',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Disco'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Ekke'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Maiev'), amount: 2 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 3 },
              { ownerId: await this.findProfileIdByUsername('Disco'), amount: 3 },
            ],
            content: `This is the same scroll that's transmuted using 1 ZOD.`,
          },
          {
            name: `Dev Fee Acquisition`,
            key: 'dev-fee',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [
              { raffleRequirement: { key: 'won1Previous' } },
              { raffleRequirement: { key: 'noWinsThisYear' } },
            ],
            winnerId: await this.findProfileIdByUsername('Riccardo'),
            entries: [{ ownerId: await this.findProfileIdByUsername('Riccardo'), amount: 10 }],
            content: `You'll receive 0.1% of all RXS transactions for the next month. Yum.`,
          },
          {
            name: `Binzy's Blessing`,
            key: 'binzy-blessing',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Disco'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 1 },
              { ownerId: await this.findProfileIdByUsername('Riccardo'), amount: 10 },
              { ownerId: await this.findProfileIdByUsername('Jon'), amount: 35 },
              { ownerId: await this.findProfileIdByUsername('Monk'), amount: 40 },
              { ownerId: await this.findProfileIdByUsername('Disco'), amount: 60 },
            ],
            content: `You'll receive one random item from Binzy.`,
          },
          {
            name: `General's Medallion`,
            key: 'medallion',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Disco'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Sam'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Jon'), amount: 20 },
              { ownerId: await this.findProfileIdByUsername('Firelord'), amount: 80 },
              { ownerId: await this.findProfileIdByUsername('Disco'), amount: 100 },
            ],
            content: `You'll receive one Magical General's Medallion.`,
          },
          {
            name: `Character`,
            key: 'character',
            status: 'Finished',
            raffleRequirementsOnRaffleRewards: [],
            winnerId: await this.findProfileIdByUsername('Maiev'),
            entries: [
              { ownerId: await this.findProfileIdByUsername('Lazy'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Ekke'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Maiev'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Binzy'), amount: 5 },
              { ownerId: await this.findProfileIdByUsername('Matheus'), amount: 5 },
            ],
            content: `You'll receive one Rune character (choose your class).`,
          },
        ],
      },
      {
        name: '#3 (October, 2023)',
        status: 'Pending',
        rewards: [
          {
            name: `50 Zavox Tickets`,
            key: '50-zavox',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `That's a lot of Zavox, think of the possibilities...`,
          },
          {
            name: `Giveaway Item`,
            key: 'giveaway-item',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `Item from the Giveaway Wallet that wasn't given away. Time to search the inventory..`,
          },
          {
            name: `$50 Cash`,
            key: '50-cash',
            status: 'Pending',
            entries: [],
            raffleRequirementsOnRaffleRewards: { raffleRequirement: { key: 'won1PreviousReward' } },
            content: `We're talking cold hard cash here...`,
          },
          {
            name: `Zavox Ticket`,
            key: '1-zavox',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `You definitely like RNG.`,
          },
          {
            name: `Character Slot Redemption Scroll`,
            key: 'character-slot',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `This is the same scroll that's transmuted using 1 ZOD.`,
          },
          {
            name: `Dev Fee Acquisition`,
            key: 'dev-fee',
            status: 'Pending',
            entries: [],
            content: `You'll receive 0.1% of all RXS transactions for the next month. Yum.`,
          },
          {
            name: `Binzy's Blessing`,
            key: 'binzy-blessing',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `You'll receive one random item from Binzy.`,
          },
          {
            name: `General's Medallion`,
            key: 'medallion',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `You'll receive one Magical General's Medallion.`,
          },
          {
            name: `Character`,
            key: 'character',
            status: 'Pending',
            raffleRequirementsOnRaffleRewards: [],
            entries: [],
            content: `You'll receive one Rune character (choose your class).`,
          },
        ],
      },
    ]

    // setup graphql api
    // make apollo request, use transformRequest

    for (const item of raffles) {
      // await call({ query: 'createOneRaffle { data }', data: transformRequest(item) })
    }
    //   if (!item.name) continue

    //

    //   const raffle = await prisma.raffle.create({
    //     data: {
    //       name: item.name,
    //       key: item.name,
    //       meta: item,
    //       status: 'Active',
    //
    //     },
    //   })

    //   for (const reward of item.rewards) {
    //     const raffleReward = await prisma.raffleReward.create({
    //       data: {
    //         raffleId: raffle.id,
    //         name: reward.name,
    //         status: reward.status,
    //         content: reward.content,
    //
    //       },
    //     })

    //     for (const requirement of reward.requirements) {
    //       await prisma.raffleRequirementsOnRaffleRewards.create({
    //         data: {
    //           id: guid(),
    //           raffleRewardId: raffleReward.id,
    //           raffleRequirementId: (
    //             await prisma.raffleRequirement.findFirst({ where: { key: requirement } })
    //           ).id,
    //
    //         },
    //       })
    //     }

    //     for (const entry of raffle.entries) {
    //       const raffleEntry = await prisma.raffleEntry.create({
    //         data: {
    //           amount: entry.amount,
    //           ownerId: entry.profileId,
    //           raffleRewardId: raffleReward.id,
    //           status: 'Active',
    //
    //         },
    //       })
    //     }
    //   }
    // }
  }

  async call(req) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    }
    const res = await fetch('http://localhost:6004/graphql', options)
    const data = await res.json()
    return data
  }

  application: any = {}
  filters: any = {}

  async createOmniverse() {
    console.log('Creating omniverses')

    this.cache.Omniverse.Arken = await this.model.Omniverse.findOne({ name: 'Arken' }).exec()

    if (!this.cache.Omniverse.Arken)
      this.cache.Omniverse.Arken = await this.model.Omniverse.create({
        name: 'Arken',
        key: 'arken',
      })

    this.cache.Omniverse.Reality = await this.model.Omniverse.findOne({ name: 'Reality' }).exec()

    if (!this.cache.Omniverse.Reality)
      this.cache.Omniverse.Reality = await this.model.Omniverse.create({
        name: 'Reality',
        key: 'reality',
      })

    console.log('Creating metaverses')

    this.cache.Metaverse.Arken = await this.model.Metaverse.findOne({ name: 'Arken' }).exec()

    if (!this.cache.Metaverse.Arken)
      this.cache.Metaverse.Arken = await this.model.Metaverse.create({
        omniverseId: this.cache.Omniverse.Arken.id,
        name: 'Arken',
        key: 'arken',
      })

    this.cache.Metaverse.Reality = await this.model.Metaverse.findOne({ name: 'Reality' }).exec()

    if (!this.cache.Metaverse.Reality)
      this.cache.Metaverse.Reality = await this.model.Metaverse.create({
        omniverseId: this.cache.Omniverse.Reality.id,
        name: 'Reality',
        key: 'reality',
      })

    console.log('Creating app: Arken')

    this.cache.Application.Arken = await this.model.Application.findOne({ name: 'Arken' }).exec()

    if (!this.cache.Application.Arken)
      this.cache.Application.Arken = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken',
        key: 'arken',
      })

    this.application = this.cache.Application.Arken
    this.filters.applicationId = this.application.id

    console.log('Creating app: Cerebro')

    this.cache.Application.Cerebro = await this.model.Application.findOne({
      name: 'Cerebro',
    }).exec()

    if (!this.cache.Application.Cerebro)
      this.cache.Application.Cerebro = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Cerebro',
        key: 'cerebro',
      })

    console.log('Creating universes')

    this.cache.Universe.Universe = await this.model.Universe.findOne({ name: 'Universe' }).exec()

    if (!this.cache.Universe.Universe)
      this.cache.Universe.Universe = await this.model.Universe.create({
        name: 'Universe',
        key: 'universe',
      })

    console.log('Creating galaxies')

    this.cache.Galaxy.MilkyWay = await this.model.Galaxy.findOne({ name: 'Milky Way' }).exec()

    if (!this.cache.Galaxy.MilkyWay)
      this.cache.Galaxy.MilkyWay = await this.model.Galaxy.create({
        universe: this.cache.Universe.Universe.id,
        name: 'Milky Way',
        key: 'milky-way',
      })

    console.log('Creating solar systems')

    this.cache.SolarSystem.SolarSystem = await this.model.SolarSystem.findOne({
      name: 'Solar System',
    }).exec()

    if (!this.cache.SolarSystem.SolarSystem)
      this.cache.SolarSystem.SolarSystem = await this.model.SolarSystem.create({
        galaxyId: this.cache.Galaxy.MilkyWay.id,
        name: 'Solar System',
        key: 'solar-system',
      })

    console.log('Creating planets')

    this.cache.Planet.Earth = await this.model.Planet.findOne({ name: 'Earth' }).exec()

    if (!this.cache.Planet.Earth)
      this.cache.Planet.Earth = await this.model.Planet.create({
        solarSystemId: this.cache.SolarSystem.SolarSystem.id,
        name: 'Earth',
        key: 'earth',
      })

    this.cache.Planet.Mars = await this.model.Planet.findOne({ name: 'Mars' }).exec()

    if (!this.cache.Planet.Mars)
      this.cache.Planet.Mars = await this.model.Planet.create({
        solarSystemId: this.cache.SolarSystem.SolarSystem.id,
        name: 'Mars',
        key: 'mars',
      })

    // console.log('Creating organizations')

    // let arkenOrganization = await this.model.Organization.findOne({ name: 'Arken' }).exec()

    // if (!arkenOrganization)
    //   arkenOrganization = await this.model.Organization.create({
    //     name: 'Arken',
    //   })

    // this.cache.Organization.Arken = arkenOrganization

    // let returnOrganization = await this.model.Organization.findOne({ name: 'Return' }).exec()

    // if (!returnOrganization)
    //   returnOrganization = await this.model.Organization.create({
    //     name: 'Return',
    //   })

    // this.cache.Organization.Return = returnOrganization

    // let asiOrganization = await this.model.Organization.findOne({ name: 'ASI' }).exec()

    // if (!asiOrganization)
    //   asiOrganization = await this.model.Organization.create({
    //     name: 'ASI',
    //   })

    // this.cache.Organization.ASI = asiOrganization

    console.log('Creating roles')

    this.cache.Role.User = await this.model.Role.findOne({ name: 'User' }).exec()

    if (!this.cache.Role.User)
      this.cache.Role.User = await this.model.Role.create({
        name: 'User',
      })

    console.log('Creating accounts')

    // mongo.Account.dropIndex('applicationId_1_organizationId_1_username_1')

    this.cache.Account.zen0 = await this.model.Account.findOne({ username: 'zen0' }).exec()

    if (!this.cache.Account.zen0)
      this.cache.Account.zen0 = await this.model.Account.create({
        username: 'zen0',
      })

    console.log('Creating profiles')

    this.cache.Profile.zen0 = await this.model.Profile.findOne({ name: 'zen0' }).exec()

    if (!this.cache.Profile.zen0)
      this.cache.Profile.zen0 = await this.model.Profile.create({
        accountId: this.cache.Account.zen0.id,
        name: 'zen0',
      })

    console.log('Creating chains')

    this.cache.Chain.ETH = await this.model.Chain.findOne({ name: 'Ethereum' }).exec()

    if (!this.cache.Chain.ETH)
      this.cache.Chain.ETH = await this.model.Chain.create({
        name: 'Ethereum',
        key: 'ethereum',
      })

    this.cache.Chain.TON = await this.model.Chain.findOne({ name: 'TON' }).exec()

    if (!this.cache.Chain.TON)
      this.cache.Chain.TON = await this.model.Chain.create({
        name: 'TON',
        key: 'ton',
      })

    this.cache.Chain.MATIC = await this.model.Chain.findOne({ name: 'Polygon' }).exec()

    if (!this.cache.Chain.MATIC)
      this.cache.Chain.MATIC = await this.model.Chain.create({
        name: 'Polygon',
        key: 'polygon',
      })

    this.cache.Chain.BSC = await this.model.Chain.findOne({ name: 'BSC' }).exec()

    if (!this.cache.Chain.BSC)
      this.cache.Chain.BSC = await this.model.Chain.create({
        name: 'BSC',
        key: 'bsc',
      })

    this.cache.Chain.IMX = await this.model.Chain.findOne({ name: 'Immutable X' }).exec()

    if (!this.cache.Chain.IMX)
      this.cache.Chain.IMX = await this.model.Chain.create({
        name: 'Immutable X',
        key: 'immutablex',
      })

    console.log('Creating app: Infinite')

    this.cache.Application['Arken: Infinite Arena'] = await this.model.Application.findOne({
      name: 'Arken: Infinite Arena',
    }).exec()

    if (!this.cache.Application['Arken: Infinite Arena'])
      this.cache.Application['Arken: Infinite Arena'] = await this.model.Application.create({
        name: 'Arken: Infinite Arena',
        key: 'arken-arena',
      })

    this.cache.Product['Arken: Infinite Arena'] = await this.model.Product.findOne({
      name: 'Arken: Infinite Arena',
    }).exec()

    if (!this.cache.Product['Arken: Infinite Arena'])
      this.cache.Product['Arken: Infinite Arena'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Infinite Arena'].id,
        name: 'Arken: Infinite Arena',
        key: 'arken-arena',
      })

    this.cache.Game['Arken: Infinite Arena'] = await this.model.Game.findOne({
      name: 'Arken: Infinite Arena',
    }).exec()

    if (!this.cache.Game['Arken: Infinite Arena'])
      this.cache.Game['Arken: Infinite Arena'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Infinite Arena'].id,
        name: 'Arken: Infinite Arena',
        key: 'arken-arena',
      })

    console.log('Creating app: Evolution')

    this.cache.Application['Arken: Evolution Isles'] = await this.model.Application.findOne({
      name: 'Arken: Evolution Isles',
    }).exec()

    if (!this.cache.Application['Arken: Evolution Isles'])
      this.cache.Application['Arken: Evolution Isles'] = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken: Evolution Isles',
        key: 'arken-isles',
      })

    this.cache.Product['Arken: Evolution Isles'] = await this.model.Product.findOne({
      name: 'Arken: Evolution Isles',
    }).exec()

    if (!this.cache.Product['Arken: Evolution Isles'])
      this.cache.Product['Arken: Evolution Isles'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Evolution Isles'].id,
        name: 'Arken: Evolution Isles',
        key: 'arken-isles',
      })

    this.cache.Game['Arken: Evolution Isles'] = await this.model.Game.findOne({
      name: 'Arken: Evolution Isles',
    }).exec()

    if (!this.cache.Game['Arken: Evolution Isles'])
      this.cache.Game['Arken: Evolution Isles'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Evolution Isles'].id,
        name: 'Arken: Evolution Isles',
        key: 'arken-isles',
      })

    console.log('Creating app: Oasis')

    this.cache.Application['Arken: Heart of the Oasis'] = await this.model.Application.findOne({
      name: 'Arken: Heart of the Oasis',
    }).exec()

    if (!this.cache.Application['Arken: Heart of the Oasis'])
      this.cache.Application['Arken: Heart of the Oasis'] = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken: Heart of the Oasis',
        key: 'arken-oasis',
      })

    this.cache.Product['Arken: Heart of the Oasis'] = await this.model.Product.findOne({
      name: 'Arken: Heart of the Oasis',
    }).exec()

    if (!this.cache.Product['Arken: Heart of the Oasis'])
      this.cache.Product['Arken: Heart of the Oasis'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Heart of the Oasis'].id,
        name: 'Arken: Heart of the Oasis',
        key: 'arken-oasis',
      })

    this.cache.Game['Arken: Heart of the Oasis'] = await this.model.Game.findOne({
      name: 'Arken: Heart of the Oasis',
    })

    if (!this.cache.Game['Arken: Heart of the Oasis'])
      this.cache.Game['Arken: Heart of the Oasis'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Heart of the Oasis'].id,
        name: 'Arken: Heart of the Oasis',
        key: 'arken-oasis',
      })

    console.log('Creating app: Raids')

    this.cache.Application['Arken: Runic Raids'] = await this.model.Application.findOne({
      name: 'Arken: Runic Raids',
    }).exec()

    if (!this.cache.Application['Arken: Runic Raids'])
      this.cache.Application['Arken: Runic Raids'] = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken: Runic Raids',
        key: 'arken-raids',
      })

    this.cache.Product['Arken: Runic Raids'] = await this.model.Product.findOne({
      name: 'Arken: Runic Raids',
    }).exec()

    if (!this.cache.Product['Arken: Runic Raids'])
      this.cache.Product['Arken: Runic Raids'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Runic Raids'].id,
        name: 'Arken: Runic Raids',
        key: 'arken-raids',
      })

    this.cache.Game['Arken: Runic Raids'] = await this.model.Game.findOne({
      name: 'Arken: Runic Raids',
    }).exec()

    if (!this.cache.Game['Arken: Runic Raids'])
      this.cache.Game['Arken: Runic Raids'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Runic Raids'].id,
        name: 'Arken: Runic Raids',
        key: 'arken-raids',
      })

    console.log('Creating app: Legends')

    this.cache.Application['Arken: Strike Legends'] = await this.model.Application.findOne({
      name: 'Arken: Strike Legends',
    }).exec()

    if (!this.cache.Application['Arken: Strike Legends'])
      this.cache.Application['Arken: Strike Legends'] = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken: Strike Legends',
        key: 'arken-legends',
      })

    this.cache.Product['Arken: Strike Legends'] = await this.model.Product.findOne({
      name: 'Arken: Strike Legends',
    }).exec()

    if (!this.cache.Product['Arken: Strike Legends'])
      this.cache.Product['Arken: Strike Legends'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Strike Legends'].id,
        name: 'Arken: Strike Legends',
        key: 'arken-legends',
      })

    this.cache.Game['Arken: Strike Legends'] = await this.model.Game.findOne({
      name: 'Arken: Strike Legends',
    }).exec()

    if (!this.cache.Game['Arken: Strike Legends'])
      this.cache.Game['Arken: Strike Legends'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Strike Legends'].id,
        name: 'Arken: Strike Legends',
        key: 'arken-legends',
      })

    console.log('Creating app: Guardians')

    this.cache.Application['Arken: Guardians Unleashed'] = await this.model.Application.findOne({
      name: 'Arken: Guardians Unleashed',
    }).exec()

    if (!this.cache.Application['Arken: Guardians Unleashed'])
      this.cache.Application['Arken: Guardians Unleashed'] = await this.model.Application.create({
        metaverseId: this.cache.Metaverse.Arken.id,
        name: 'Arken: Guardians Unleashed',
        key: 'arken-guardians',
      })

    this.cache.Product['Arken: Guardians Unleashed'] = await this.model.Product.findOne({
      name: 'Arken: Guardians Unleashed',
    }).exec()

    if (!this.cache.Product['Arken: Guardians Unleashed'])
      this.cache.Product['Arken: Guardians Unleashed'] = await this.model.Product.create({
        applicationId: this.cache.Application['Arken: Guardians Unleashed'].id,
        name: 'Arken: Guardians Unleashed',
        key: 'arken-guardians',
      })

    this.cache.Game['Arken: Guardians Unleashed'] = await this.model.Game.findOne({
      name: 'Arken: Guardians Unleashed',
    }).exec()

    if (!this.cache.Game['Arken: Guardians Unleashed'])
      this.cache.Game['Arken: Guardians Unleashed'] = await this.model.Game.create({
        productId: this.cache.Product['Arken: Guardians Unleashed'].id,
        name: 'Arken: Guardians Unleashed',
        key: 'arken-guardians',
      })
  }

  db: any
  model: any
  cache: any

  async init() {
    console.log('Connecting to Prisma...')

    await prisma.$connect()

    console.log('Connecting to Mongo....')

    this.db = await database.init({ app: this })

    // mongoose = await Mongoose.connect(process.env.MONGO_ENDPOINT, {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    //   retryWrites: false,
    // } as any)

    console.log('Connected to databases.')

    console.log('Creating models...')

    const models = Object.keys(schemas).filter((key) => key !== 'NodeRelation')

    this.model = {}
    this.cache = {}
    this.oldCache = {}

    for (const model of models) {
      this.model[model] = this.db.model(model, schemas[model])
      this.cache[model] = {}
      this.oldCache[model] = {}
    }

    await this.createOmniverse() //
    await this.migrateEras()
    // await this.migrateCharacterAttributes() //
    // await this.migrateGuides() //

    // await this.migrateAssets() //
    // await this.migrateItemAttributes() //
    // await this.migrateItemRecipes() //
    // await this.migrateItemMaterials() //
    // // await this.migrateItemAttributeParams() // forget about this?
    // // await this.migrateItemParams() // forget about this?
    // await this.migrateItemSpecificTypes() //
    // await this.migrateItemSubTypes() //
    // await this.migrateItemTypes() //
    // // await this.migrateItemAffixes()
    // await this.migrateItemSlots() //
    // await this.migrateItemRarities() //
    // await this.migrateItemSets() //
    // // await this.migrateItemTransmuteRules() // fill this in and do later
    // await this.migrateSkills() //
    // await this.migrateSkillMods() //
    // await this.migrateSkillClassifications() //
    // await this.migrateSkillConditions() //
    // // await this.migrateSkillConditionParams() // dont need??
    // await this.migrateSkillStatusEffects() //
    // await this.migrateSkillTrees() // fill in and do again later
    // await this.migrateSkillTreeNodes()
    // // await this.migrateCharacterGuilds()
    // await this.migrateCharacterRaces()
    // // await this.migrateCharacterGenders()
    // await this.migrateCharacterFactions()
    // await this.migrateCharacterClasses()
    // // await this.migrateCharacters()
    // await this.migrateCharacterTypes()
    // await this.migrateCharacterAttributes()
    // // await this.migrateCharacterStats() // merged into attributes
    // await this.migrateCharacterTitles()
    // // await this.migrateCharacterSpawnRules() // unused
    // // await this.migrateCharacterFightingStyles() // unused
    // await this.migrateCharacterNameChoices()
    // // await this.migrateCharacterMovementStasuses() // unused
    // // await this.migrateCharacterPersonalities() // unused
    // await this.migrateAreas() //
    // // await this.migrateAreaTypes() // not sure
    // await this.migrateAreaNameChoices()
    // await this.migrateEnergies()
    // await this.migrateLore()
    // // await this.migrateHistoricalRecords() // none
    // await this.migrateNpcs()
    // await this.migrateActs()
    // await this.migrateEras()
    // // await this.migrateAreaLandmark()
    // await this.migrateAchievements()
    // await this.migrateBiomeFeatures()
    // await this.migrateBiomes() // needs to be rerun
    // await this.migrateSolarSystems()
    // await this.migratePlanets()

    // await this.migrateTeams()
    // await this.migrateAccounts()
    // await this.migrateClaims()
    // // await this.migrateGameItems()
    // await this.migrateTrades()
    // await this.migrateReferrals()
    // await this.migrateBounties()
    // await this.migrateRaffles()
    // await this.migratePolls()
    // // await this.migrateProposals()
    // // await this.migrateForms()
    // // await this.aggregateStudios()

    console.log('Done.')

    await prisma.$disconnect()
  }
}

const app = new App()

app.init().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
