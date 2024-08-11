// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import jetpack from 'fs-jetpack'
import path from 'path'
import { util } from '@arken/node'
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
import * as schemas from '@arken/node/schemas'
import Mongoose, { ConnectOptions, InferSchemaType } from 'mongoose'

const { log, isDebug } = util

class ModelWrapper {
  model: any
  schema: any
  filters: any

  // [
  //     'hooks',         'base',
  //     'modelName',     'model',
  //     'db',            'discriminators',
  //     'events',        '$appliedMethods',
  //     '$appliedHooks', '_middleware',
  //     '$__insertMany', 'schema',
  //     'collection',    '$__collection',
  //     'Query',         '$init',
  //     '$caught'
  //   ]
  constructor(model, filters = {}) {
    this.model = model
    this.schema = model.schema
    this.filters = filters
  }

  aggregate(...props) {
    return this.model.aggregate(...props)
  }

  find(filter: any = {}, options = {}) {
    if (
      this.model.modelName !== 'Application' &&
      this.model.modelName !== 'Organization' &&
      this.model.modelName !== 'Account'
    )
      filter.applicationId = this.filters.applicationId

    if (filter.applicationId && typeof filter.applicationId === 'string') {
      // @ts-ignore
      filter.applicationId = new Mongoose.Types.ObjectId(filter.applicationId + '')
    }

    return this.model.find(filter, options)
  }

  findOne(filter: any = {}, options = {}) {
    if (
      this.model.modelName !== 'Application' &&
      this.model.modelName !== 'Organization' &&
      this.model.modelName !== 'Account'
    )
      filter.applicationId = this.filters.applicationId

    if (filter.applicationId && typeof filter.applicationId === 'string') {
      // @ts-ignore
      filter.applicationId = new Mongoose.Types.ObjectId(filter.applicationId + '')
    }

    return this.model.findOne(filter, options)
  }

  create(data) {
    if (
      this.model.modelName !== 'Application' &&
      this.model.modelName !== 'Organization' &&
      this.model.modelName !== 'Account'
    )
      data.applicationId = this.filters.applicationId

    if (data.applicationId && typeof data.applicationId === 'string') {
      // @ts-ignore
      data.applicationId = new Mongoose.Types.ObjectId(data.applicationId + '')
    }

    const res = this.model.create(data)

    const createHander = <T>(path: string[] = []) => ({
      get: (target: T, key: keyof T): any => {
        if (key == 'isProxy') return true
        if (typeof target[key] === 'object' && target[key] != null)
          return new Proxy(target[key], createHander<any>([...path, key as string]))
        return target[key]
      },
      set: (target: T, key: keyof T, value: any) => {
        console.log(`Setting ${[...path, key]} to: `, value)
        target[key] = value
        return true
      },
    })

    if (res.meta) res.meta = new Proxy(res.meta, createHander<any>())

    // if (res.meta) res.meta = createNestedProxy(res.meta)

    return res
  }

  update(filter, update, options = {}) {
    if (
      this.model.modelName !== 'Application' &&
      this.model.modelName !== 'Organization' &&
      this.model.modelName !== 'Account'
    ) {
      filter.applicationId = this.filters.applicationId
      update.applicationId = this.filters.applicationId // Ensure the update object includes applicationId
    }

    if (filter.applicationId && typeof filter.applicationId === 'string') {
      // @ts-ignore
      filter.applicationId = new Mongoose.Types.ObjectId(filter.applicationId + '')
    }

    if (update.applicationId && typeof update.applicationId === 'string') {
      // @ts-ignore
      update.applicationId = new Mongoose.Types.ObjectId(update.applicationId + '')
    }

    return this.model.update(filter, update, options)
  }

  // Add more methods as needed (updateMany, delete, etc.)
}

const mongo: any = {}
let mongoose

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

const map: any = {}
const oldmap: any = {}

const gameNumberToGameId = (id: any) =>
  ({
    1: map.Game['Arken: Runic Raids'].id,
    2: map.Game['Arken: Evolution Isles'].id,
    3: map.Game['Arken: Infinite Arena'].id,
    4: map.Game['Arken: Guardians Unleashed'].id,
    5: map.Game['Arken: Heart of the Oasis'].id,
  }[id])

async function getGuild(oldId: any, oldGuild: any = null) {
  if (!map.Team[oldId] && oldGuild) {
    map.Team[oldId] = await mongo.Team.create({
      metaverseId: map.Metaverse.Arken.id,
      key: oldGuild.key,
      name: oldGuild.name,
      description: oldGuild.description,
      meta: oldGuild,
      status: 'Active',
      ownerId: map.Profile.zen0.id,
      createdById: map.Profile.zen0.id,
      editedById: map.Profile.zen0.id,
    })
  }

  return map.Team[oldId]
}

async function migrateAccounts() {
  await oldPrisma.$connect()

  const oldAccounts = await oldPrisma.account.findMany()
  console.log(`Number of Prisma v1 accounts to migrate: ${oldAccounts.length}`)

  for (const index in oldAccounts) {
    const oldAccount = oldAccounts[index]

    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(`Progress: ${(parseInt(index) / oldAccounts.length) * 100}%`)

    if (!oldAccount.email) continue

    let newAccount = await mongo.Account.findOne({ username: oldAccount.email })

    if (!newAccount) {
      map.Account[oldAccount.address] = await mongo.Account.create({
        metaverseId: map.Metaverse.Arken.id,
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
    const existingAccount = await mongo.Account.findOne({
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

      map.Account[existingAccount.address] = existingAccount

      continue
    }

    if (!map.Account[account.address]) {
      map.Account[account.address] = await mongo.Account.create({
        metaverseId: map.Metaverse.Arken.id,
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

      console.log(`Inserted account with ID: ${map.Account[account.address].id}`)
    }
  }

  const oldProfiles = await prisma.profile.findMany()
  console.log(`Found ${oldProfiles.length} old profiles`)

  for (const oldProfile of oldProfiles) {
    // @ts-ignore
    let newProfile = await mongo.Profile.findOne({ name: oldProfile.name })

    if (!newProfile && oldProfile?.name) {
      console.log(oldProfile)
      if (!map.Account[oldProfile.address]) {
        map.Account[oldProfile.address] = await mongo.Account.findOne({
          $or: [
            {
              username: oldProfile.name,
            },
            {
              address: oldProfile.address,
            },
          ],
        })

        if (!map.Account[oldProfile.address]) {
          map.Account[oldProfile.address] = await mongo.Account.create({
            metaverseId: map.Metaverse.Arken.id,
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

      newProfile = await mongo.Profile.create({
        metaverseId: map.Metaverse.Arken.id,
        // @ts-ignore
        name: oldProfile.name,
        key: oldProfile.key,
        meta: oldProfile.meta,
        status: { active: 'Active' }[oldProfile.status],
        address: oldProfile.address,
        roleId: map.Role[{ user: 'User' }[oldProfile.role]].id,
        accountId: map.Account[oldProfile.address].id,
        chainId: map.Chain.BSC.id,
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
          map.Character[character.tokenId] = await mongo.Character.findOne({
            token: character.tokenId,
          })

          if (!map.Character[character.tokenId]) {
            map.Character[character.tokenId] = await mongo.Character.create({
              metaverseId: map.Metaverse.Arken.id,
              name: character.name,
              meta: character,
              status: 'Active',
              ownerId: newProfile.id,
              token: character.tokenId,
              classId: map.CharacterClass[character.id],
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

async function migrateClaims() {
  // @ts-ignore
  for (const claimRequest of claimRequests) {
    if (!claimRequest) continue

    const profile =
      map.Profile[claimRequest.address] ||
      (await mongo.Profile.findOne({
        address: claimRequest.address,
      }))

    if (!profile) {
      console.log('Profile not found', claimRequest.username, claimRequest.address)
      continue
    }

    map.Payment[claimRequest.id] = await mongo.Payment.findOne({
      key: claimRequest.id,
    })

    if (map.Payment[claimRequest.id]) {
      console.log(`Payment with key ${claimRequest.id} already exists.`)
      continue
    }

    map.Payment[claimRequest.id] = await mongo.Payment.create({
      metaverseId: map.Metaverse.Arken.id,
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

async function migrateReferrals() {
  // @ts-ignore
  for (const referral of referrals) {
    const sender = await mongo.Profile.findOne({
      name: referral.referrer,
    })

    const recipient = await mongo.Profile.findOne({
      address: referral.address,
    })

    if (!sender || !recipient) {
      console.log('Sender or recipient not found', referral)
      continue
    }

    const existingReferral = await mongo.Referral.findOne({
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

    await mongo.Referral.create({
      recipientId: recipient.id,
      senderId: sender.id,
      meta: referral,
      status,
    })

    console.log(`Inserted referral with ID: ${referral.id}`)
  }

  console.log('Done')
}

async function migrateAssets() {
  console.log('Migrating assets')

  const items = jetpack.read(path.resolve(`../data/items.json`), 'json')

  // @ts-ignore
  for (const item of items) {
    oldmap.Asset[item.id] = item

    if (!item.id) continue

    if (map.Asset[item.name]) {
      console.log('Asset ' + item.name + ' already exists')
      continue
    }

    map.Asset[item.name] = await mongo.Asset.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    // console.log(asset.id)
  }
}

// async function migrateGameItems() {
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

async function createUser(address) {
  // craete account
  // create profile
  // check items
  // check trades
  // const profile = await prisma.profile.create({
  //   data: {
  //     metaverseId: map.Metaverse.Arken.id,
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

async function createItem(item, owner?) {
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
  //       metaverseId: map.Metaverse.Arken.id,
  //
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

async function migrateTrades() {
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
  const profiles = await mongo.Profile.find()
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
        ? await mongo.Profile.findOne({
            address: oldTrade.buyer,
          })
        : null
    const owner = await prisma.profile.findFirst({
      where: { address: { equals: oldTrade.owner } },
    })

    // cant find user? look in filesystem
    const decodedItem = util.decoder.decodeItem(oldTrade.tokenId)

    map.Item[decodedItem.token] = await mongo.Item.create({
      metaverseId: map.Metaverse.Arken.id,
      chain: map.Chain.BSC.id,
      assetId: map.Asset[decodedItem.name].id,
      key: decodedItem.token,
      meta: decodedItem,
      name: decodedItem.name,
      token: decodedItem.token,
      status: 'Active',
    })

    // const asset = find asset by trade.item.id + ''
    map.Trade[oldTrade.id + ''] = await mongo.Trade.create({
      metaverseId: map.Metaverse.Arken.id,
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

async function migrateTeams() {
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
  const teams = await mongo.Team.find()
  for (const team of teams) {
    if (!map.Team[team.name]) {
      map.Team[team.name] = team
      oldmap.Team[team.meta.id] = team
    }
  }

  for (const guild of guildsData) {
    if (oldmap.Team[guild.id]) {
      console.log('Guild with name ' + oldmap.Team[guild.id].name + ' already exists.')
      continue
    }

    const details = require('../../data/guilds/' + guild.id + '/overview.json')

    map.Team[details.name] = await mongo.Team.find({ name: details.name })

    if (!map.Team[details.name]) {
      map.Team[details.name] = await mongo.Team.create({
        metaverseId: map.Metaverse.Arken.id,
        name: details.name,
        description: details.description,
        key: details.name,
        meta: details,
        status: 'Active',
      })
    }

    oldmap.Team[guild.id] = map.Team[details.name]

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
      const profile = await mongo.Profile.findOne({ address: member.address })

      if (profile) {
        console.log('Character with guild ' + details.name + ' for profile ' + member.address)

        map.Character[profile.id] = await mongo.Character.create({
          teamId: map.Team[details.name].id,
          profileId: profile.id,
          metaverseId: map.Metaverse.Arken.id,
          classId: map.Class[member.characterId].id,
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

async function migrateAchievements() {
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

  const metaverse = await mongo.Metaverse.findOne({ name: 'Arken' })

  if (!metaverse) {
    console.error('Metaverse not found')
    return
  }

  for (const item of achievements) {
    oldmap.Achievement[item.id] = item

    if (item.icon) item.icon = item.icon.replace('undefined', '')

    // Check if the achievement already exists in MongoDB
    map.Achievement[item.key] = await mongo.Achievement.findOne({ key: item.key })
    if (map.Achievement[item.key]) {
      console.log(`Achievement with key ${item.key} already exists.`)
      continue
    }

    // Insert the achievement into MongoDB
    map.Achievement[item.key] = await mongo.Achievement.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.key,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    console.log(`Inserted achievement with key: ${item.key}`)
  }
}

async function migrateAreas() {
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
    oldmap.Area[item.id] = item

    // Check if the area already exists in MongoDB
    map.Area[item.name] = await mongo.Area.findOne({ name: item.name })
    if (map.Area[item.name]) {
      console.log(`Area with name ${item.name} already exists.`)
      continue
    }

    // Insert the area into MongoDB
    map.Area[item.name] = await mongo.Area.create({
      metaverseId: map.Metaverse.Arken.id,
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

async function migrateCharacterAttributes() {
  console.log('Migrating character attributes')

  for (const item of characterAttributes) {
    oldmap.CharacterAttribute[item.id] = item
    if (!item.name) continue

    map.CharacterAttribute[item.name] = await mongo.CharacterAttribute.findOne({ name: item.name })

    if (map.CharacterAttribute[item.name]) {
      console.log(`Character attribute with name ${item.name} already exists.`)
      continue
    }

    map.CharacterAttribute[item.name] = await mongo.CharacterAttribute.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateSkillMods() {
  for (const item of skillMods) {
    oldmap.SkillMod[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillMod.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillMod = await mongo.SkillMod.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkillMod.save()
  }
}

async function migrateSkillClassifications() {
  for (const item of skillClassifications) {
    oldmap.SkillClassification[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillClassification.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillClassification = await mongo.SkillClassification.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkillClassification.save()
  }
}

async function migrateSkillConditions() {
  for (const item of skillConditions) {
    oldmap.SkillCondition[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillCondition.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillCondition = await mongo.SkillCondition.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkillCondition.save()
  }
}
// async function migrateSkillConditionParams() {
//   for (const item of skillCondition) {
//     if (!item.name) continue
//

//     await prisma.gameSkill.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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
async function migrateSkillStatusEffects() {
  for (const item of skillStatusEffects) {
    oldmap.SkillStatusEffect[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillStatusEffect.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillStatusEffect = await mongo.SkillStatusEffect.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkillStatusEffect.save()
  }
}

async function migrateSkillTrees() {
  const skillTrees = []

  for (const item of skillTrees) {
    oldmap.SkillTree[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillTree.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillTree = await mongo.SkillTree.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkillTree.save()
  }
}

async function migrateSkillTreeNodes() {
  for (const item of skillTreeNodes) {
    oldmap.SkillTreeNode[item.uuid] = item
    if (!item.name) continue

    const existingItem = await mongo.SkillTreeNode.findOne({ name: item.name })
    if (existingItem) continue

    const newSkillTreeNode = await mongo.SkillTreeNode.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name + '',
      meta: item,
      status: 'Active',
    })

    await newSkillTreeNode.save()
  }
}

async function migrateSkills() {
  for (const item of skills) {
    oldmap.Skill[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.Skill.findOne({ name: item.name })
    if (existingItem) continue

    const newSkill = await mongo.Skill.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newSkill.save()
  }
}

async function migrateItemTransmuteRules() {
  const transmuteRules = [
    { id: 1, name: 'Increase Attribute', chance: 0.1 },
    { id: 1, name: 'Decrease Attribute', chance: 0.01 },
  ]

  for (const item of transmuteRules) {
    if (!item.name) continue

    const existingItem = await mongo.ItemTransmuteRule.findOne({ name: item.name })
    if (existingItem) continue

    const newItemTransmuteRule = await mongo.ItemTransmuteRule.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newItemTransmuteRule.save()
  }
}

async function migrateCharacterTitles() {
  for (const item of characterTitles) {
    oldmap.CharacterTitle[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.CharacterTitle.findOne({ name: item.name })
    if (existingItem) continue

    const newCharacterTitle = await mongo.CharacterTitle.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    await newCharacterTitle.save()
  }
}

async function migrateCharacterTypes() {
  for (const item of characterTypes) {
    oldmap.CharacterType[item.id] = item
    if (!item.name) continue

    const existingItem = await mongo.CharacterType.findOne({ name: item.name })
    if (existingItem) continue

    const newCharacterType = await mongo.CharacterType.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    await newCharacterType.save()
  }
}

async function migrateActs() {
  for (const item of acts) {
    oldmap.Act[item.id] = item
    const existingItem = await mongo.Act.findOne({ name: item.name })
    if (existingItem) continue

    const newAct = await mongo.Act.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    await newAct.save()
  }
}

async function migrateEras() {
  for (const item of eras) {
    oldmap.Era[item.id] = item
    const existingItem = await mongo.Era.findOne({ name: item.name })
    if (existingItem) continue

    const newEra = await mongo.Era.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    await newEra.save()
  }
}

async function migratePlanets() {
  for (const item of planets) {
    oldmap.Planet[item.id] = item
    const existingItem = await mongo.Planet.findOne({ name: item.name })
    if (existingItem) continue

    const newPlanet = await mongo.Planet.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    await newPlanet.save()
  }
}

async function migrateSolarSystems() {
  for (const item of solarSystems) {
    map.SolarSystem[item.name] = await mongo.SolarSystem.findOne({ name: item.name })
    oldmap.SolarSystem[item.id] = item

    if (map.SolarSystem[item.name]) {
      console.log('SolarSystem ' + item.name + ' already exists')
      continue
    }

    map.SolarSystem[item.name] = await mongo.SolarSystem.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    oldmap.SolarSystem[item.id] = item
  }
}

async function migrateLore() {
  for (const item of lore) {
    oldmap.Lore[item.id] = item
    map.Lore[item.name] = await mongo.Lore.findOne({ name: item.name })
    if (map.Lore[item.name]) {
      console.log('Lore ' + item.name + ' already exists')
      continue
    }

    map.Lore[item.name] = await mongo.Lore.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })
  }
}

async function migrateGames() {
  for (const item of games) {
    oldmap.Game[item.id] = item
    map.Game[item.name] = await mongo.Game.findOne({ name: item.name })
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
    if (map.Game[item.name]) {
      map.Game[item.name].description = item.description
      map.Game[item.name].meta = item
      map.Game[item.name].status = 'Active'

      await map.Game[item.name].save()

      continue
    }

    if (!map.Application[item.name]) {
      map.Application[item.name] = await mongo.Application.findOne({
        name: item.name,
      }).exec()

      if (!map.Application[item.name]) {
        map.Application[item.name] = await mongo.Application.create({
          metaverseId: map.Metaverse.Arken.id,
          name: item.name,
          key: item.name,
          status: 'Active',
        })
      }
    }

    if (!map.Product[item.name]) {
      map.Product[item.name] = await mongo.Product.findOne({
        name: item.name,
      }).exec()

      if (!map.Product[item.name]) {
        map.Product[item.name] = await mongo.Product.create({
          applicationId: map.Application[item.name].id,
          name: item.name,
          key: item.name,
          status: 'Active',
        })
      }
    }

    map.Game[item.name] = await mongo.Game.create({
      metaverseId: map.Metaverse.Arken.id,
      productId: map.Game[item.name].id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateGuides() {
  console.log('Migrating game guides')
  // Fetch all game guides from Prisma
  // const gameGuides = await prisma.gameGuide.findMany()

  for (const item of gameInfo) {
    oldmap.Guide[item.uuid] = item
    // "uuid": "recwto2jjdQAl72Ja",
    // "name": "Game Description",
    // "text": "**Game Objective**\n\nDefeat a continuous stream of player opponents in skill-based gameplay to earn prizes.\n\n\n",
    // "game": 3,
    // "isEnabled": true,
    // "attachments": []
    // Check if the game guide already exists in MongoDB
    map.Guide[item.uuid] = await mongo.Guide.findOne({ key: item.uuid }).exec()

    if (map.Guide[item.uuid]) {
      console.log(`Guide with name ${item.name} already exists.`)
      continue
    }

    // Insert the game guide into MongoDB
    map.Guide[item.uuid] = await mongo.Guide.create({
      metaverseId: map.Metaverse.Arken.id,
      gameId: gameNumberToGameId(item.game),
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

async function migrateCharacterClasses() {
  for (const item of characterClasses) {
    if (!item.name) continue

    map.CharacterClass[item.id] = await mongo.CharacterClass.findOne({ name: item.name })

    if (map.CharacterClass[item.name]) {
      console.log('CharacterClass ' + item.name + ' already exists')
      continue
    }

    map.CharacterClass[item.id] = await mongo.CharacterClass.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isPlayable ? 'Active' : 'Pending',
    })
  }
}

async function migrateCharacterFactions() {
  for (const item of characterFactions) {
    if (!item.name) continue

    map.CharacterFaction[item.id] = await mongo.CharacterFaction.findOne({ name: item.name })
    if (map.CharacterFaction[item.name]) {
      console.log('CharacterFaction ' + item.name + ' already exists')
      continue
    }

    map.CharacterFaction[item.id] = await mongo.CharacterFaction.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })
  }
}

// async function  migrateCharacterSpawnRules() {
//   for (const item of characterRaces) {
//     if (!item.name) continue

//

//     await prisma.gameCharacterRace.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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

// async function  migrateCharacterFightingStyles() {
//   for (const item of characterRaces) {
//     if (!item.name) continue

//

//     await prisma.gameCharacterRace.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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

async function migrateAreaNameChoices() {
  for (const item of areaNameChoices) {
    if (!item.name) continue

    map.AreaNameChoice[item.name] = await mongo.AreaNameChoice.findOne({ name: item.name })
    if (map.AreaNameChoice[item.name]) {
      console.log('AreaNameChoice ' + item.name + ' already exists')
      continue
    }

    map.AreaNameChoice[item.name] = await mongo.AreaNameChoice.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateCharacterNameChoices() {
  for (const item of characterNameChoices) {
    if (!item.name) continue

    map.CharacterNameChoice[item.name] = await mongo.CharacterNameChoice.findOne({
      name: item.name,
    })
    oldmap.CharacterNameChoice[item.id] = item

    if (map.CharacterNameChoice[item.name]) {
      console.log('CharacterNameChoice ' + item.name + ' already exists')
      continue
    }

    map.CharacterNameChoice[item.name] = await mongo.CharacterNameChoice.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    oldmap.CharacterNameChoice[item.id] = item
  }
}
// async function  migrateCharacterMovementStasuses() {
//   for (const item of characterRaces) {
//     if (!item.name) continue

//

//     await prisma.gameCharacterRace.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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

// async function  migrateCharacterPersonalities() {
//   for (const item of characterRaces) {
//     if (!item.name) continue

//

//     await prisma.gameCharacterRace.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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

async function migrateCharacterRaces() {
  for (const item of characterRaces) {
    if (!item.name) continue

    map.CharacterRace[item.name] = await mongo.CharacterRace.findOne({ name: item.name })
    oldmap.CharacterRace[item.id] = item

    if (map.CharacterRace[item.name]) {
      console.log('CharacterRace ' + item.name + ' already exists')
      continue
    }

    map.CharacterRace[item.name] = await mongo.CharacterRace.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isPlayable ? 'Active' : 'Pending',
    })

    oldmap.CharacterRace[item.id] = map.CharacterRace[item.name]
  }
}

async function migrateEnergies() {
  for (const item of energies) {
    if (!item.name) continue

    map.Energy[item.name] = await mongo.Energy.findOne({ name: item.name })

    if (map.Energy[item.name]) {
      console.log('Energy ' + item.name + ' already exists')
      continue
    }

    map.Energy[item.name] = await mongo.Energy.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.Energy[item.id] = map.Energy[item.name]
  }
}

async function migrateNpcs() {
  for (const item of npcs) {
    if (!item.title) continue

    map.Npc[item.title] = await mongo.Npc.findOne({ name: item.title })
    if (map.Npc[item.title]) {
      console.log('NPC ' + item.title + ' already exists')
      continue
    }

    map.Npc[item.title] = await mongo.Npc.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.title,
      description: item.description,
      key: item.title,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    })

    oldmap.Npc[item.id] = map.Npc[item.title]
  }
}

// async function migrateAreaTypes() {
//   for (const item of areaTypes) {
//     if (!item.name) continue

//     const existingItem = await mongo.AreaType.findOne({ name: item.name })
//     if (existingItem) continue

//     const newAreaType = await mongo.AreaType.create({
//       metaverseId: map.Metaverse.Arken.id,
//       name: item.name,
//       description: item.description,
//       key: item.name,
//       meta: item,
//       status: item.isEnabled ? 'Active' : 'Pending',
//     })

//     await newAreaType.save()
//   }
// }

// async function migrateAreaLandmarks() {
//   for (const item of areaLandmarks) {
//     if (!item.name) continue

//     const existingItem = await mongo.AreaLandmark.findOne({ name: item.name })
//     if (existingItem) continue

//     const area = await mongo.Area.findOne({ key: item.area + '' })

//     const newAreaLandmark = await mongo.AreaLandmark.create({
//       metaverseId: map.Metaverse.Arken.id,
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

async function migrateBiomes() {
  for (const item of biomes) {
    if (!item.name) continue

    map.Biome[item.name] = await mongo.Biome.findOne({ name: item.name })
    oldmap.Biome[item.id] = map.Biome[item.name]

    if (map.Biome[item.name]) {
      console.log('Biome ' + item.name + ' already exists')
      continue
    }

    map.Biome[item.name] = await mongo.Biome.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.Biome[item.id] = map.Biome[item.name]
  }
}

async function migrateBiomeFeatures() {
  for (const item of biomeFeatures) {
    if (!item.name) continue

    map.BiomeFeature[item.name] = await mongo.BiomeFeature.findOne({ name: item.name })
    oldmap.BiomeFeature[item.id] = map.BiomeFeature[item.name]

    if (map.BiomeFeature[item.name]) {
      console.log('BiomeFeature ' + item.name + ' already exists')
      continue
    }

    map.BiomeFeature[item.name] = await mongo.BiomeFeature.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.BiomeFeature[item.id] = map.BiomeFeature[item.name]
  }
}

async function migrateItemSpecificTypes() {
  for (const item of itemSpecificTypes) {
    if (!item.name) continue

    map.ItemSpecificType[item.name] = await mongo.ItemType.findOne({ name: item.name })
    oldmap.ItemSpecificType[item.id] = map.ItemSpecificType[item.name]

    if (map.ItemSpecificType[item.name]) {
      console.log('Item specificType ' + item.name + ' already exists')
      continue
    }

    map.ItemSpecificType[item.name] = await mongo.ItemType.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.ItemSpecificType[item.id] = map.ItemSpecificType[item.name]
  }
}

async function migrateItemTypes() {
  for (const item of itemTypes) {
    if (!item.name) continue

    map.ItemType[item.name] = await mongo.ItemType.findOne({ name: item.name })
    oldmap.ItemType[item.id] = map.ItemType[item.name]

    if (map.ItemType[item.name]) {
      console.log('Item type ' + item.name + ' already exists')
      continue
    }

    map.ItemType[item.name] = await mongo.ItemType.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.ItemType[item.id] = map.ItemType[item.name]
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

async function migrateItemSlots() {
  for (const item of itemSlots) {
    if (!item.name) continue

    map.ItemSlot[item.name] = await mongo.ItemSlot.findOne({ name: item.name })
    oldmap.ItemSlot[item.id] = map.ItemSlot[item.name]

    if (map.ItemSlot[item.name]) {
      console.log('Item slot ' + item.name + ' already exists')
      continue
    }

    map.ItemSlot[item.name] = await mongo.ItemSlot.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.ItemSlot[item.id] = map.ItemSlot[item.name]
  }
}

async function migrateItemSubTypes() {
  for (const item of itemSubTypes) {
    if (!item.name) continue

    map.ItemSubType[item.name] = await mongo.ItemSubType.findOne({ name: item.name })
    oldmap.ItemSubType[item.id] = map.ItemSubType[item.name]

    if (map.ItemSubType[item.name]) {
      console.log('Item subtype ' + item.name + ' already exists')
      continue
    }

    map.ItemSubType[item.name] = await mongo.ItemSubType.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })

    oldmap.ItemSubType[item.id] = map.ItemSubType[item.name]
  }
}

async function migrateItemMaterials() {
  console.log('Migrating item materials')

  for (const item of itemMaterials) {
    if (!item.name) continue

    map.ItemMaterial[item.name] = await mongo.ItemMaterial.findOne({ name: item.name })
    if (map.ItemMaterial[item.name]) {
      console.log('Item material ' + item.name + ' already exists')
      continue
    }

    map.ItemMaterial[item.name] = await mongo.ItemMaterial.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateItemRarities() {
  for (const item of itemRarities) {
    if (!item.name) continue

    map.ItemRarity[item.name] = await mongo.ItemRarity.findOne({ name: item.name })
    if (map.ItemRarity[item.name]) {
      console.log('Item rarity ' + item.name + ' already exists')
      continue
    }

    map.ItemRarity[item.name] = await mongo.ItemRarity.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateItemRecipes() {
  console.log('Migrating item recipes')

  for (const item of itemRecipes) {
    if (!item.name) continue

    map.ItemRecipe[item.name] = await mongo.ItemRecipe.findOne({ name: item.name })
    if (map.ItemRecipe[item.name]) {
      console.log('Item recipe ' + item.name + ' already exists')
      continue
    }

    map.ItemRecipe[item.name] = await mongo.ItemRecipe.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateItemSets() {
  for (const item of itemSets) {
    if (!item.name) continue

    map.ItemSet[item.name] = await mongo.ItemSet.findOne({ name: item.name })
    if (map.ItemSet[item.name]) {
      console.log('Item set ' + item.name + ' already exists')
      continue
    }

    map.ItemSet[item.name] = await mongo.ItemSet.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

async function migrateItemAttributes() {
  console.log('Migrating item attributes')

  for (const item of itemAttributes) {
    if (!item.name) continue

    map.ItemAttribute[item.name] = await mongo.ItemAttribute.findOne({ name: item.name })
    if (map.ItemAttribute[item.name]) {
      console.log('Item attribute ' + item.name + ' already exists')
      continue
    }

    map.ItemAttribute[item.name] = await mongo.ItemAttribute.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

// async function migrateItemAttributeParams() {
//   for (const item of itemAttributeParams) {
//     if (!item.name) continue

//

//     await prisma.gameItemAttributeParam.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
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

async function migrateBounties() {
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

    map.Bounty[item.name] = await mongo.Bounty.findOne({ name: item.name })
    if (map.Bounty[item.name]) {
      console.log('Bounty ' + item.name + ' already exists')
      continue
    }

    map.Bounty[item.name] = await mongo.Bounty.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.status,
    })
  }
}

async function migratePolls() {
  const polls = []

  for (const item of polls) {
    if (!item.name) continue

    map.Poll[item.name] = await mongo.Poll.findOne({ name: item.name })
    if (map.Poll[item.name]) {
      console.log('Poll ' + item.name + ' already exists')
      continue
    }

    map.Poll[item.name] = await mongo.Poll.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    })
  }
}

const usernameToProfileId = {
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

async function findProfileIdByUsername(username) {
  if (usernameToProfileId[username]) return usernameToProfileId[username]
  usernameToProfileId[username] = (await mongo.Profile.find({ name: username })).id
  return usernameToProfileId[username]
}

async function migrateRaffles() {
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
          winnerId: await findProfileIdByUsername('Matheus'),
          entries: [
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Discomonk'), amount: 20 },
            { ownerId: await findProfileIdByUsername('FireLord'), amount: 40 },
            { ownerId: await findProfileIdByUsername('SamKouCaille'), amount: 50 },
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 55 },
          ],
        },
        {
          name: `Giveaway Item`,
          key: 'giveaway-item',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('SamKouCaille'),
          entries: [
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 2 },
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 2 },
            { ownerId: await findProfileIdByUsername('SamKouCaille'), amount: 2 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 1 },
          ],
          content: `Item from the Giveaway Wallet that wasn't given away. Time to search the inventory..`,
        },
        {
          name: `Diablo 2 Item`,
          key: 'd2-item',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Riccardo'),
          entries: [
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 20 },
            { ownerId: await findProfileIdByUsername('FireLord'), amount: 40 },
            { ownerId: await findProfileIdByUsername('Monk'), amount: 50 },
            { ownerId: await findProfileIdByUsername('Discomonk'), amount: 60 },
            { ownerId: await findProfileIdByUsername('Riccardo'), amount: 160 },
          ],
          content: `Fundraiser item that has been purchased by Binzy using the dev cut.`,
        },
        {
          name: `Zavox Ticket`,
          key: '1-zavox',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Matheus'),
          entries: [
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 2 },
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 2 },
          ],
          content: `You definitely like RNG.`,
        },
        {
          name: `Character Slot Redemption Scroll`,
          key: 'character-slot',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Matheus'),
          entries: [
            { ownerId: await findProfileIdByUsername('SamKouCaille'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 2 },
          ],
          content: `This is the same scroll that's transmuted using 1 ZOD.`,
        },
        {
          name: `Dev Fee Acquisition`,
          key: 'dev-fee',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [{ raffleRequirement: { key: 'noWinsThisYear' } }],
          winnerId: await findProfileIdByUsername('Maiev'),
          entries: [
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 20 },
            { ownerId: await findProfileIdByUsername('Monk'), amount: 70 },
            { ownerId: await findProfileIdByUsername('Discomonk'), amount: 80 },
            { ownerId: await findProfileIdByUsername('Maiev'), amount: 100 },
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
          winnerId: await findProfileIdByUsername('Monk'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Sam'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Jon'), amount: 20 },
            { ownerId: await findProfileIdByUsername('Monk'), amount: 30 },
            { ownerId: await findProfileIdByUsername('Disco'), amount: 30 },
            { ownerId: await findProfileIdByUsername('FireLord'), amount: 31 },
            { ownerId: await findProfileIdByUsername('Scrooge'), amount: 51 },
            { ownerId: await findProfileIdByUsername('Monk'), amount: 53 },
          ],
          content: `That's a lot of Zavox, think of the possibilities...`,
        },
        {
          name: `Giveaway Item`,
          key: 'giveaway-item',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Lazy'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 5 },
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
          winnerId: await findProfileIdByUsername('Maiev'),
          entries: [
            { ownerId: await findProfileIdByUsername('Riccardo'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Sam'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Maiev'), amount: 20 },
          ],
          content: `We're talking cold hard cash here...`,
        },
        {
          name: `Zavox Ticket`,
          key: '1-zavox',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Matheus'),
          entries: [
            { ownerId: await findProfileIdByUsername('Ekke'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Disco'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 2 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 2 },
          ],
          content: `You definitely like RNG.`,
        },
        {
          name: `Character Slot Redemption Scroll`,
          key: 'character-slot',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Disco'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Ekke'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Maiev'), amount: 2 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 3 },
            { ownerId: await findProfileIdByUsername('Disco'), amount: 3 },
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
          winnerId: await findProfileIdByUsername('Riccardo'),
          entries: [{ ownerId: await findProfileIdByUsername('Riccardo'), amount: 10 }],
          content: `You'll receive 0.1% of all RXS transactions for the next month. Yum.`,
        },
        {
          name: `Binzy's Blessing`,
          key: 'binzy-blessing',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Disco'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 1 },
            { ownerId: await findProfileIdByUsername('Riccardo'), amount: 10 },
            { ownerId: await findProfileIdByUsername('Jon'), amount: 35 },
            { ownerId: await findProfileIdByUsername('Monk'), amount: 40 },
            { ownerId: await findProfileIdByUsername('Disco'), amount: 60 },
          ],
          content: `You'll receive one random item from Binzy.`,
        },
        {
          name: `General's Medallion`,
          key: 'medallion',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Disco'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Sam'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Jon'), amount: 20 },
            { ownerId: await findProfileIdByUsername('Firelord'), amount: 80 },
            { ownerId: await findProfileIdByUsername('Disco'), amount: 100 },
          ],
          content: `You'll receive one Magical General's Medallion.`,
        },
        {
          name: `Character`,
          key: 'character',
          status: 'Finished',
          raffleRequirementsOnRaffleRewards: [],
          winnerId: await findProfileIdByUsername('Maiev'),
          entries: [
            { ownerId: await findProfileIdByUsername('Lazy'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Ekke'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Maiev'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Binzy'), amount: 5 },
            { ownerId: await findProfileIdByUsername('Matheus'), amount: 5 },
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
  //       metaverseId: map.Metaverse.Arken.id,
  //
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
  //         metaverseId: map.Metaverse.Arken.id,
  //
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
  //           metaverseId: map.Metaverse.Arken.id,
  //
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

async function call(req) {
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

async function createOmniverse() {
  console.log('Creating omniverses')

  map.Omniverse.Arken = await mongo.Omniverse.findOne({ name: 'Arken' }).exec()

  if (!map.Omniverse.Arken)
    map.Omniverse.Arken = await mongo.Omniverse.create({
      name: 'Arken',
      key: 'arken',
    })

  map.Omniverse.Reality = await mongo.Omniverse.findOne({ name: 'Reality' }).exec()

  if (!map.Omniverse.Reality)
    map.Omniverse.Reality = await mongo.Omniverse.create({
      name: 'Reality',
      key: 'reality',
    })

  console.log('Creating metaverses')

  map.Metaverse.Arken = await mongo.Metaverse.findOne({ name: 'Arken' }).exec()

  if (!map.Metaverse.Arken)
    map.Metaverse.Arken = await mongo.Metaverse.create({
      omniverseId: map.Omniverse.Arken.id,
      name: 'Arken',
      key: 'arken',
    })

  map.Metaverse.Reality = await mongo.Metaverse.findOne({ name: 'Reality' }).exec()

  if (!map.Metaverse.Reality)
    map.Metaverse.Reality = await mongo.Metaverse.create({
      omniverseId: map.Omniverse.Reality.id,
      name: 'Reality',
      key: 'reality',
    })

  console.log('Creating universes')

  map.Universe.Universe = await mongo.Universe.findOne({ name: 'Universe' }).exec()

  if (!map.Universe.Universe)
    map.Universe.Universe = await mongo.Universe.create({
      metaverseId: map.Metaverse.Reality.id,
      name: 'Universe',
      key: 'universe',
    })

  console.log('Creating galaxies')

  map.Galaxy.MilkyWay = await mongo.Galaxy.findOne({ name: 'Milky Way' }).exec()

  if (!map.Galaxy.MilkyWay)
    map.Galaxy.MilkyWay = await mongo.Galaxy.create({
      metaverseId: map.Metaverse.Reality.id,
      universe: map.Universe.Universe.id,
      name: 'Milky Way',
      key: 'milky-way',
    })

  console.log('Creating solar systems')

  map.SolarSystem.SolarSystem = await mongo.SolarSystem.findOne({ name: 'Solar System' }).exec()

  if (!map.SolarSystem.SolarSystem)
    map.SolarSystem.SolarSystem = await mongo.SolarSystem.create({
      metaverseId: map.Metaverse.Reality.id,
      galaxyId: map.Galaxy.MilkyWay.id,
      name: 'Solar System',
      key: 'solar-system',
    })

  console.log('Creating planets')

  map.Planet.Earth = await mongo.Planet.findOne({ name: 'Earth' }).exec()

  if (!map.Planet.Earth)
    map.Planet.Earth = await mongo.Planet.create({
      metaverseId: map.Metaverse.Reality.id,
      solarSystemId: map.SolarSystem.SolarSystem.id,
      name: 'Earth',
      key: 'earth',
    })

  map.Planet.Mars = await mongo.Planet.findOne({ name: 'Mars' }).exec()

  if (!map.Planet.Mars)
    map.Planet.Mars = await mongo.Planet.create({
      metaverseId: map.Metaverse.Reality.id,
      solarSystemId: map.SolarSystem.SolarSystem.id,
      name: 'Mars',
      key: 'mars',
    })

  // console.log('Creating organizations')

  // let arkenOrganization = await mongo.Organization.findOne({ name: 'Arken' }).exec()

  // if (!arkenOrganization)
  //   arkenOrganization = await mongo.Organization.create({
  //     name: 'Arken',
  //   })

  // map.Organization.Arken = arkenOrganization

  // let returnOrganization = await mongo.Organization.findOne({ name: 'Return' }).exec()

  // if (!returnOrganization)
  //   returnOrganization = await mongo.Organization.create({
  //     name: 'Return',
  //   })

  // map.Organization.Return = returnOrganization

  // let asiOrganization = await mongo.Organization.findOne({ name: 'ASI' }).exec()

  // if (!asiOrganization)
  //   asiOrganization = await mongo.Organization.create({
  //     name: 'ASI',
  //   })

  // map.Organization.ASI = asiOrganization

  console.log('Creating roles')

  map.Role.User = await mongo.Role.findOne({ name: 'User' }).exec()

  if (!map.Role.User)
    map.Role.User = await mongo.Role.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'User',
    })

  console.log('Creating accounts')

  // mongo.Account.dropIndex('applicationId_1_organizationId_1_username_1')

  map.Account.zen0 = await mongo.Account.findOne({ username: 'zen0' }).exec()

  if (!map.Account.zen0)
    map.Account.zen0 = await mongo.Account.create({
      metaverseId: map.Metaverse.Arken.id,
      username: 'zen0',
    })

  console.log('Creating profiles')

  map.Profile.zen0 = await mongo.Profile.findOne({ name: 'zen0' }).exec()

  if (!map.Profile.zen0)
    map.Profile.zen0 = await mongo.Profile.create({
      metaverseId: map.Metaverse.Arken.id,
      accountId: map.Account.zen0.id,
      name: 'zen0',
    })

  console.log('Creating chains')

  map.Chain.ETH = await mongo.Chain.findOne({ name: 'Ethereum' }).exec()

  if (!map.Chain.ETH)
    map.Chain.ETH = await mongo.Chain.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Ethereum',
    })

  map.Chain.TON = await mongo.Chain.findOne({ name: 'TON' }).exec()

  if (!map.Chain.TON)
    map.Chain.TON = await mongo.Chain.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'TON',
    })

  map.Chain.MATIC = await mongo.Chain.findOne({ name: 'Polygon' }).exec()

  if (!map.Chain.MATIC)
    map.Chain.MATIC = await mongo.Chain.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Polygon',
    })

  map.Chain.BSC = await mongo.Chain.findOne({ name: 'BSC' }).exec()

  if (!map.Chain.BSC)
    map.Chain.BSC = await mongo.Chain.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'BSC',
    })

  map.Chain.IMX = await mongo.Chain.findOne({ name: 'Immutable X' }).exec()

  if (!map.Chain.IMX)
    map.Chain.IMX = await mongo.Chain.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Immutable X',
    })

  console.log('Creating app: Cerebro')

  map.Application.Cerebro = await mongo.Application.findOne({ name: 'Cerebro' }).exec()

  if (!map.Application.Cerebro)
    map.Application.Cerebro = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Cerebro',
      key: 'cerebro',
    })

  console.log('Creating app: Infinite')

  map.Application['Arken: Infinite Arena'] = await mongo.Application.findOne({
    name: 'Arken: Infinite Arena',
  }).exec()

  if (!map.Application['Arken: Infinite Arena'])
    map.Application['Arken: Infinite Arena'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })

  map.Product['Arken: Infinite Arena'] = await mongo.Product.findOne({
    name: 'Arken: Infinite Arena',
  }).exec()

  if (!map.Product['Arken: Infinite Arena'])
    map.Product['Arken: Infinite Arena'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Infinite Arena'].id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })

  map.Game['Arken: Infinite Arena'] = await mongo.Game.findOne({
    name: 'Arken: Infinite Arena',
  }).exec()

  if (!map.Game['Arken: Infinite Arena'])
    map.Game['Arken: Infinite Arena'] = await mongo.Game.create({
      productId: map.Product['Arken: Infinite Arena'].id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })

  console.log('Creating app: Evolution')

  map.Application['Arken: Evolution Isles'] = await mongo.Application.findOne({
    name: 'Arken: Evolution Isles',
  }).exec()

  if (!map.Application['Arken: Evolution Isles'])
    map.Application['Arken: Evolution Isles'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  map.Product['Arken: Evolution Isles'] = await mongo.Product.findOne({
    name: 'Arken: Evolution Isles',
  }).exec()

  if (!map.Product['Arken: Evolution Isles'])
    map.Product['Arken: Evolution Isles'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Evolution Isles'].id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  map.Game['Arken: Evolution Isles'] = await mongo.Game.findOne({
    name: 'Arken: Evolution Isles',
  }).exec()

  if (!map.Game['Arken: Evolution Isles'])
    map.Game['Arken: Evolution Isles'] = await mongo.Game.create({
      productId: map.Product['Arken: Evolution Isles'].id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  console.log('Creating app: Oasis')

  map.Application['Arken: Heart of the Oasis'] = await mongo.Application.findOne({
    name: 'Arken: Heart of the Oasis',
  }).exec()

  if (!map.Application['Arken: Heart of the Oasis'])
    map.Application['Arken: Heart of the Oasis'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  map.Product['Arken: Heart of the Oasis'] = await mongo.Product.findOne({
    name: 'Arken: Heart of the Oasis',
  }).exec()

  if (!map.Product['Arken: Heart of the Oasis'])
    map.Product['Arken: Heart of the Oasis'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Heart of the Oasis'].id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  map.Game['Arken: Heart of the Oasis'] = await mongo.Game.findOne({
    name: 'Arken: Heart of the Oasis',
  })

  if (!map.Game['Arken: Heart of the Oasis'])
    map.Game['Arken: Heart of the Oasis'] = await mongo.Game.create({
      productId: map.Product['Arken: Heart of the Oasis'].id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  console.log('Creating app: Raids')

  map.Application['Arken: Runic Raids'] = await mongo.Application.findOne({
    name: 'Arken: Runic Raids',
  }).exec()

  if (!map.Application['Arken: Runic Raids'])
    map.Application['Arken: Runic Raids'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  map.Product['Arken: Runic Raids'] = await mongo.Product.findOne({
    name: 'Arken: Runic Raids',
  }).exec()

  if (!map.Product['Arken: Runic Raids'])
    map.Product['Arken: Runic Raids'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Runic Raids'].id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  map.Game['Arken: Runic Raids'] = await mongo.Game.findOne({ name: 'Arken: Runic Raids' }).exec()

  if (!map.Game['Arken: Runic Raids'])
    map.Game['Arken: Runic Raids'] = await mongo.Game.create({
      productId: map.Product['Arken: Runic Raids'].id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  console.log('Creating app: Legends')

  map.Application['Arken: Strike Legends'] = await mongo.Application.findOne({
    name: 'Arken: Strike Legends',
  }).exec()

  if (!map.Application['Arken: Strike Legends'])
    map.Application['Arken: Strike Legends'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  map.Product['Arken: Strike Legends'] = await mongo.Product.findOne({
    name: 'Arken: Strike Legends',
  }).exec()

  if (!map.Product['Arken: Strike Legends'])
    map.Product['Arken: Strike Legends'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Strike Legends'].id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  map.Game['Arken: Strike Legends'] = await mongo.Game.findOne({
    name: 'Arken: Strike Legends',
  }).exec()

  if (!map.Game['Arken: Strike Legends'])
    map.Game['Arken: Strike Legends'] = await mongo.Game.create({
      productId: map.Product['Arken: Strike Legends'].id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  console.log('Creating app: Guardians')

  map.Application['Arken: Guardians Unleashed'] = await mongo.Application.findOne({
    name: 'Arken: Guardians Unleashed',
  }).exec()

  if (!map.Application['Arken: Guardians Unleashed'])
    map.Application['Arken: Guardians Unleashed'] = await mongo.Application.create({
      metaverseId: map.Metaverse.Arken.id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })

  map.Product['Arken: Guardians Unleashed'] = await mongo.Product.findOne({
    name: 'Arken: Guardians Unleashed',
  }).exec()

  if (!map.Product['Arken: Guardians Unleashed'])
    map.Product['Arken: Guardians Unleashed'] = await mongo.Product.create({
      applicationId: map.Application['Arken: Guardians Unleashed'].id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })

  map.Game['Arken: Guardians Unleashed'] = await mongo.Game.findOne({
    name: 'Arken: Guardians Unleashed',
  }).exec()

  if (!map.Game['Arken: Guardians Unleashed'])
    map.Game['Arken: Guardians Unleashed'] = await mongo.Game.create({
      productId: map.Product['Arken: Guardians Unleashed'].id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })
}

async function main() {
  console.log('Connecting to Prisma...')

  await prisma.$connect()

  console.log('Connecting to Mongo....')

  mongoose = await Mongoose.connect(process.env.MONGO_ENDPOINT, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    retryWrites: false,
  } as any)

  console.log('Connected to databases.')

  console.log('Creating models...')

  for (const model of Object.keys(schemas)) {
    map[model] = {}
    oldmap[model] = {}
    mongo[model] = new ModelWrapper(Mongoose.model(model, schemas[model], model))
  }

  await createOmniverse() //
  await migrateCharacterAttributes() //
  await migrateGuides() //

  await migrateAssets() //
  await migrateItemAttributes() //
  await migrateItemRecipes() //
  await migrateItemMaterials() //
  // await migrateItemAttributeParams() // forget about this?
  // await migrateItemParams() // forget about this?
  await migrateItemSpecificTypes() //
  await migrateItemSubTypes() //
  await migrateItemTypes() //
  // await migrateItemAffixes()
  await migrateItemSlots() //
  await migrateItemRarities() //
  await migrateItemSets() //
  // await migrateItemTransmuteRules() // fill this in and do later
  await migrateSkills() //
  await migrateSkillMods() //
  await migrateSkillClassifications() //
  await migrateSkillConditions() //
  // await migrateSkillConditionParams() // dont need??
  await migrateSkillStatusEffects() //
  await migrateSkillTrees() // fill in and do again later
  await migrateSkillTreeNodes()
  // await migrateCharacterGuilds()
  await migrateCharacterRaces()
  // await migrateCharacterGenders()
  await migrateCharacterFactions()
  await migrateCharacterClasses()
  // await migrateCharacters()
  await migrateCharacterTypes()
  await migrateCharacterAttributes()
  // await migrateCharacterStats() // merged into attributes
  await migrateCharacterTitles()
  // await migrateCharacterSpawnRules() // unused
  // await migrateCharacterFightingStyles() // unused
  await migrateCharacterNameChoices()
  // await migrateCharacterMovementStasuses() // unused
  // await migrateCharacterPersonalities() // unused
  await migrateAreas() //
  // await migrateAreaTypes() // not sure
  await migrateAreaNameChoices()
  await migrateEnergies()
  await migrateLore()
  // await migrateHistoricalRecords() // none
  await migrateNpcs()
  await migrateActs()
  await migrateEras()
  // await migrateAreaLandmark()
  await migrateAchievements()
  await migrateBiomeFeatures()
  await migrateBiomes() // needs to be rerun
  await migrateSolarSystems()
  await migratePlanets()

  await migrateTeams()
  await migrateAccounts()
  await migrateClaims()
  // await migrateGameItems()
  await migrateTrades()
  await migrateReferrals()
  await migrateBounties()
  await migrateRaffles()
  await migratePolls()
  // await migrateProposals()
  // await migrateForms()
  // await aggregateStudios()

  console.log('Done.')

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
