// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import jetpack from 'fs-jetpack'
import path from 'path'
import dayjs from 'dayjs'
import { log, isDebug } from '@arken/node/util'
import { toTitleCase } from '@arken/node/util/string'
import itemData1 from '@arken/node/data/generated/items.json'
import { decodeItem, getTokenIdFromItem, convertRuneSymbol } from '@arken/node/util/decoder'
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
import stats from '../../data/stats.json'
import runes from '../../data/runes.json'
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
import itemAffixes from '@arken/node/data/generated/itemAffixes.json'
import gameInfo from '@arken/node/data/generated/gameInfos.json'
import characters from '@arken/node/data/generated/characters.json'
import characterClasses from '@arken/node/data/generated/characterClasses.json'
import characterFactions from '@arken/node/data/generated/characterFactions.json'
import characterRaces from '@arken/node/data/generated/characterRaces.json'
import characterGenders from '@arken/node/data/generated/characterGenders.json'
import lore from '@arken/node/data/generated/lores.json'
import biomes from '@arken/node/data/generated/biomes.json'
import biomeFeatures from '@arken/node/data/generated/biomeFeatures.json'
import acts from '@arken/node/data/generated/acts.json'
// import areaTypes from '@arken/node/data/generated/areaTypes.json'
import areas from '@arken/node/data/generated/areas.json'
import areaTypes from '@arken/node/data/generated/areaTypes.json'
import eras from '@arken/node/data/generated/eras.json'
import timeGates from '@arken/node/data/generated/timeGates.json'
import runeItems from '@arken/node/data/items'
import energies from '@arken/node/data/generated/energies.json'
import npcs from '@arken/node/data/generated/npcs.json'
import planets from '@arken/node/data/generated/planets.json'
import solarSystems from '@arken/node/data/generated/solarSystems.json'
import games from '@arken/node/data/generated/games.json'
import achievements from '../../data/achievements.json'
import itemData2 from '../../data/items.json'
import * as Arken from '@arken/node/types'
import * as database from '@arken/node/db'
import {
  Area,
  Asset,
  Chain,
  Character,
  Chat,
  Collection,
  Core,
  Game,
  Interface,
  Item,
  Job,
  Market,
  Product,
  Profile,
  Raffle,
  Skill,
  Video,
} from '@arken/node'
import _ from 'lodash'
import { getAsset } from 'node:sea'
import { kMaxLength } from 'buffer'

const startDate = dayjs()
let ticket = 0
let egg = 0
let trinket = 0
let rrxs = 0
const problemProfiles = {}

const itemData: typeof itemData1 = _.values(
  _.merge(_.keyBy(itemData1, 'id'), _.keyBy(itemData2, 'id'))
)

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
      1: this.cache.Game['Runic Raids'].id,
      2: this.cache.Game['Evolution Isles'].id,
      3: this.cache.Game['Infinite Arena'].id,
      4: this.cache.Game['Guardians Unleashed'].id,
      5: this.cache.Game['Heart of the Oasis'].id,
    }[id]
  }

  async createItemFromDef(itemDef: any) {
    try {
      const assetId = await this.model.Asset.findOne({ name: itemDef.name })

      const chainId = await this.model.Chain.findOne({ name: 'BSC' })

      const typeId = await this.model.ItemType.findOne({ key: itemDef.type + '' })

      const subTypeId = await this.model.ItemSubType.findOne({ key: itemDef.subType + '' })

      const specificTypeId = await this.model.ItemSpecificType.findOne({
        key: itemDef.specificType + '',
      })

      const rarityId = await this.model.ItemRarity.findOne({ key: 1 + '' })

      const slotId = await this.model.ItemSlot.findOne({ key: itemDef.slots[0] + '' })

      // // If setId is applicable
      // let setId: Arken.Schema.ObjectId | undefined = undefined;
      // if (itemDef.details.Type === 'Rune' && itemDef.category === 'accessory') {
      //   setId = await this.model.ItemSet.findOne({ name: 'Default Set' });
      // }

      // Create the Item
      const newItem = await this.model.Item.create({
        token: itemDef.uuid, // Assuming 'uuid' is used as token
        assetId: assetId,
        chainId: chainId,
        typeId: typeId,
        subTypeId: subTypeId,
        specificTypeId: specificTypeId,
        rarityId: rarityId,
        slotId: slotId,
        attributes: [], // Populate if attributes are present
        quantity: parseInt(itemDef.value, 10) || 1,
        isTradeable: itemDef.isTradeable,
        isEquipable: itemDef.isEquipable,
        isUnequipable: itemDef.isUnequipable,
        isTransferable: itemDef.isTransferable,
        // Add other fields as necessary
        // For fields not present in the schema, consider adding a 'meta' field or ignoring
        // Example:
        meta: itemDef,
      })

      console.log(`Item '${newItem.name}' created successfully with ID: ${newItem._id}`)
    } catch (error) {
      console.error('Error creating item:', error)
    }
  }

  async getGuild(oldId: any, oldGuild: any = null) {
    if (!this.cache.Team[oldId] && oldGuild) {
      this.cache.Team[oldId] = await this.model.Team.findOne({
        applicationId: this.cache.Application.Arken.id,
        key: oldGuild.key,
      })

      if (!this.cache.Team[oldId]) {
        this.cache.Team[oldId] = await this.model.Team.create({
          applicationId: this.cache.Application.Arken.id,
          key: oldGuild.key,
          name: oldGuild.name,
          description: oldGuild.description,
          meta: oldGuild,
          status: 'Active',
          ownerId: this.cache.Profile.Hashwarp.id,
          createdById: this.cache.Profile.Hashwarp.id,
          editedById: this.cache.Profile.Hashwarp.id,
        })
      }
    }

    return this.cache.Team[oldId]
  }

  async migrateAccounts() {
    await oldPrisma.$connect()

    const account1 = [] // await oldPrisma.account.findMany()
    const account2 = [] // await prisma.account.findMany()
    const accounts: typeof account2 = _.values(
      _.merge(_.keyBy(account1, 'lastName'), _.keyBy(account2, 'lastName'))
    )

    console.log(`Number of Prisma accounts to migrate: ${accounts.length}`)

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
      }).exec()

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
          applicationId: this.cache.Application.Arken.id,
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
    process.stdout.write('\n')
  }

  async migrateProfiles() {
    this.cache.Application.Arken = await this.model.Application.findOne({
      key: 'arken',
    }).exec()

    const profiles1 = await oldPrisma.profile.findMany()
    const profiles2 = await prisma.profile.findMany()
    let profiles: typeof profiles2 = _.values(
      _.merge(_.keyBy(profiles1, 'address'), _.keyBy(profiles2, 'address'))
    )

    console.log(`Found ${profiles.length} old profiles`)

    // profiles = [profiles.find((p) => p.address === '0x150F24A67d5541ee1F8aBce2b69046e25d64619c')]

    for (const index in profiles) {
      const profile = profiles[index]
      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
      process.stdout.write(`Progress: ${(parseInt(index) / profiles.length) * 100}%`)

      this.cache.Profile[profile.address] = (await this.getProfileByAddress(
        profile.address
      )) as Arken.Profile.Types.Profile

      if (!this.cache.Profile[profile.address] && !this.cache.Account[profile.address]) {
        this.cache.Account[profile.address] = await this.model.Account.findOne({
          $or: [
            {
              username: profile.name,
            },
            {
              address: profile.address,
            },
          ],
        })

        if (!this.cache.Account[profile.address]) {
          this.cache.Account[profile.address] = await this.model.Account.create({
            applicationId: this.cache.Application.Arken.id,
            username: profile.name,
            meta: profile.meta,
            status: {
              active: 'Active',
            }[profile.status],
            email: profile.address + '@arken.gg',
            firstName: profile.name,
            lastName: profile.address,
            address: profile.address,
            avatar: profile.avatar,
          })
        }
      }

      if (!this.cache.Profile[profile.address]) {
        this.cache.Profile[profile.address] = await this.model.Profile.create({
          applicationId: this.cache.Application.Arken.id,
          accountId: this.cache.Account[profile.address].id,
          chainId: this.cache.Chain.BSC.id,
          roleId: this.cache.Role[{ user: 'User', developer: 'Developer' }[profile.role]].id,
          // @ts-ignore
          guildId: await this.getGuild(profile.meta.guildId).id,
          // @ts-ignore
          name: profile.name,
          key: profile.address,
          meta: profile.meta,
          status: { active: 'Active' }[profile.status],
          address: profile.address,
        })
      }

      const newProfile = this.cache.Profile[profile.address]

      newProfile.address = newProfile.address || profile.address
      newProfile.name = newProfile.name || profile.name
      newProfile.meta = _.merge(newProfile.meta, profile.meta)

      await newProfile.save()

      // @ts-ignore
      if (profile?.meta?.characters) {
        // @ts-ignore
        // console.log(profile.meta.characters)
        // @ts-ignore
        for (const character of profile.meta.characters) {
          // need to hit BSC to figure out the characters token ID so we don't duplicate
          this.cache.Character[character.tokenId] = await this.model.Character.findOne({
            token: character.tokenId,
          }).exec()

          if (!this.cache.Character[character.tokenId]) {
            this.cache.Character[character.tokenId] = await this.model.Character.create({
              applicationId: this.cache.Application.Arken.id,
              profileId: newProfile.id,
              name: character.name,
              key: character.tokenId,
              meta: character,
              status: 'Active',
              ownerId: newProfile.id,
              token: character.tokenId,
              classId: this.cache.CharacterClass[character.id],
              isPlayer: true,
            })
            console.log(`Inserted character with token: ${character.tokenId}`)
          }
        }
      }

      const achievements = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/achievements.json`),
        'json'
      )
      const characters = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/characters.json`),
        'json'
      )
      const evolution = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/evolution.json`),
        'json'
      )
      const inventory = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/inventory.json`),
        'json'
      )
      const market = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/market.json`),
        'json'
      )
      const overview = jetpack.read(
        path.resolve(`../data/users/${newProfile.address}/overview.json`),
        'json'
      )

      // console.log(111, newProfile.meta, achievements, characters)

      // newProfile.meta = {
      //   ...(newProfile.meta || {}),
      //   achievements,
      //   characters,
      //   evolution,
      //   inventory,
      //   market,
      //   overview,
      // }

      if (achievements) newProfile.meta.achievements = achievements
      if (characters) newProfile.meta.characters = characters
      if (evolution) newProfile.meta.evolution = evolution
      if (inventory) newProfile.meta.inventory = inventory
      if (market) newProfile.meta.market = market
      if (overview) newProfile.meta.overview = overview

      // console.log(222, newProfile.meta)

      // Migrate rewards
      // rewards: {
      //   items: [],
      //   runes: {
      //     amn: 0.1,
      //     dol: 0.26,
      //     hel: 0.03,
      //     ith: 0.19,
      //     nef: 0.22,
      //     ort: 0.14,
      //     ral: 0.03,
      //     sol: 0.06,
      //     tal: 0.19,
      //     tir: 0.21,
      //     zod: 0.161,
      //     thul: 0.24,
      //     shael: 0.22
      //   }
      // },

      const token = newProfile.characters?.[0]?.meta.tokenId

      if (!this.cache.Character[token])
        this.cache.Character[token] = await this.model.Character.findOne({
          token: token,
        })

      const character = this.cache.Character[token]

      // console.log('Setting up character xxx', newProfile.characters)

      if (character) {
        // console.log('Setting up character ', character.id)

        if (!character.equipment[character.equipmentIndex]) {
          character.equipment[character.equipmentIndex] = {
            items: [],
          }
        }

        if (!character.inventory[character.inventoryIndex]) {
          character.inventory[character.inventoryIndex] = {
            items: [],
          }
        }

        let rewardBag = character.inventory[character.inventoryIndex].items.find(
          (item: any) => item.name === 'Runic Bag'
        )

        if (!rewardBag) {
          const itemDef = itemData.find((r) => r.name === `Runic Bag`)

          const tokenId = getTokenIdFromItem(itemDef)

          // const // console.log(itemDef, tokenId)
          rewardBag = await this.model.Item.create({
            token: tokenId, // TODO: is there a tokenId for every rune yet? if not, reserve it and insert as an Asset. dont need token if we use asset.
            assetId: this.cache.Asset[itemDef.name].id,
            chainId: this.cache.Chain.BSC.id,
            applicationId: this.cache.Application.Arken.id,
            characterId: character.id,
            // key: tokenId,
            meta: itemDef,
            name: itemDef.name,
            status: 'Active',
            distribution: 'Migration',
            materialId: this.cache.ItemMaterial[itemDef.materials?.[0]]?.id,
            // skinId: this.cache.ItemSkin[itemDef.skin]?.id, // TODO: convert the skin mapper stuff to items, and get the skin item from there
            // recipeId: this.cache.ItemRecipe[itemDef.recipe]?.id,
            typeId: this.cache.ItemType[itemDef.type]?.id,
            subTypeId: this.cache.ItemSubType[itemDef.subType]?.id,
            specificTypeId: this.cache.ItemSpecificType[itemDef.specificType]?.id,
            // rarityId: this.cache.ItemRarity[itemDef.rarity]?.id,
            slotIds: itemDef.slots
              ? itemDef.slots.map((slot: any) => this.oldCache.ItemSlot[slot || 0]?.id)
              : [],
            // setId: this.cache.ItemSet[itemDef.set]?.id,
            attributes: [],
            // properties: z.record(z.any()).optional(),
            // type: z.string().default('bag'), // stash, bag, equipment, etc.
            // TODO: use this for the transmog / skin stuff, ingame, check if type === skin
            items: [],
            quantity: 1,
            capacity: undefined,
            points: 0,
          })
        }

        const rewards = []
        const items = []

        if (
          Array.isArray(newProfile.meta?.rewards?.items) &&
          newProfile.meta?.rewards?.items.length > 0
        ) {
          // console.log('items', newProfile.meta?.rewards?.items)

          for (const item of newProfile.meta?.rewards?.items) {
            if (item.rarity === 'Mythic') console.log(item)

            if (item.name === 'Santa Christmas 2021 Ticket') {
              const itemDef = itemData.find((r) => r.name === 'Santa Christmas 2021 Ticket')

              rewards.push({
                ...itemDef,
                quantity: 1,
              })
            }

            if (item.name === 'Guardian Egg') {
              const itemDef = itemData.find((r) => r.name === 'Mysterious Egg')

              if (item.rarity === 'Magical') itemDef.branches[1].attributes[0].value = 6
              else if (item.rarity === 'Rare') itemDef.branches[1].attributes[0].value = 5
              else if (item.rarity === 'Epic') itemDef.branches[1].attributes[0].value = 4
              else if (item.rarity === 'Mythic') itemDef.branches[1].attributes[0].value = 3

              rewards.push({
                ...itemDef,
                quantity: 1,
              })
            }
            if (item.name === 'Trinket') {
              const items = ['Glow Fly Powder', 'Black Drake Scale', 'Black Drake Talon']

              const randomItem = items[Math.floor(Math.random() * items.length)]

              const itemDef = itemData.find((r) => r.name === randomItem)

              if (item.rarity === 'Magical') itemDef.branches[1].attributes[0].value = 5
              else if (item.rarity === 'Rare') itemDef.branches[1].attributes[0].value = 4
              else if (item.rarity === 'Epic') itemDef.branches[1].attributes[0].value = 3
              else if (item.rarity === 'Mythic') itemDef.branches[1].attributes[0].value = 3

              rewards.push({
                ...itemDef,
                quantity: 1,
              })
            }
            if (item.name === 'RUNE') {
              const itemDef = itemData.find((r) => r.name === 'Token')
              itemDef.branches[1].attributes[0].param1.value = 2
              itemDef.branches[1].attributes[1].param1.value =
                '0x2098fef7eeae592038f4f3c4b008515fed0d5886'

              rewards.push({
                ...itemDef,
                quantity: 10000,
              })
            }
          }
        }

        // TODO: create the Item for these using Asset, or find the Item in their inventory and increase the quantity
        if (typeof newProfile.meta?.rewards?.runes === 'object') {
          for (const rune of Object.keys(newProfile.meta.rewards.runes)) {
            // Look for an existing Runic Bag, if doesnt exist create it
            // Add the runes to that
            let itemDef = itemData.find(
              (r) => r.name === `${toTitleCase(convertRuneSymbol(rune))} Rune`
            )

            if (!itemDef) {
              console.log('Error finding rune', rune)

              if (rune === 'usd' || rune === 'busd') {
                itemDef = itemData.find((r) => r.name === 'Token')
                itemDef.branches[1].attributes[0].param1.value = 1
                itemDef.branches[1].attributes[1].param1.value =
                  '0xe9e7cea3dedca5984780bafc599bd69add087d56'
              } else if (rune === 'rxs') {
                itemDef = itemData.find((r) => r.name === 'Token')
                itemDef.branches[1].attributes[0].param1.value = 2
                itemDef.branches[1].attributes[1].param1.value =
                  '0x2098fef7eeae592038f4f3c4b008515fed0d5886'
              }

              rewards.push({
                ...itemDef,
                quantity: newProfile.meta.rewards.runes[rune],
              })
            }
          }
        }

        for (const reward of rewards) {
          const tokenId = getTokenIdFromItem(reward)

          this.cache.Item[character.id + tokenId] = await this.model.Item.findOne({
            characterId: character.id,
            token: tokenId,
            // key: reward.key
          })

          if (!this.cache.Item[character.id + tokenId]) {
            this.cache.Item[character.id + tokenId] = await this.model.Item.create({
              assetId: this.cache.Asset[reward.name].id,
              chainId: this.cache.Chain.BSC.id,
              characterId: character.id,
              token: tokenId, // TODO: is there a tokenId for every rune yet? if not, reserve it and insert as an Asset. dont need token if we use asset.
              applicationId: this.cache.Application.Arken.id,
              key: character.id + tokenId,
              meta: reward,
              name: reward.name,
              status: 'Active',
              distribution: 'Reward',
              materialId: this.cache.ItemMaterial[reward.materials?.[0]]?.id,
              // skinId: this.cache.ItemSkin[reward.skin]?.id, // TODO: convert the skin mapper stuff to items, and get the skin item from there
              // recipeId: this.cache.ItemRecipe[reward.recipe]?.id,
              typeId: this.cache.ItemType[reward.type]?.id,
              subTypeId: this.cache.ItemSubType[reward.subType]?.id,
              specificTypeId: this.cache.ItemSpecificType[reward.specificType]?.id,
              // rarityId: this.cache.ItemRarity[reward.rarity]?.id,
              slotId: this.cache.ItemSlot[reward.slots?.[0]]?.id,
              // setId: this.cache.ItemSet[reward.set]?.id,
              attributes: [],
              quantity: reward.quantity > 0 ? reward.quantity : 0,
              x: undefined,
              y: undefined,
              // properties: z.record(z.any()).optional(),
              // type: z.string().default('bag'), // stash, bag, equipment, etc.
              // TODO: use this for the transmog / skin stuff, ingame, check if type === skin
              items: [],
              capacity: undefined,
              points: 0,
            })
          }

          const item = this.cache.Item[character.id + tokenId]

          // Reset if this was setup before
          if (dayjs(item.updatedDate).isBefore(startDate)) {
            item.quantity = 0
            item.meta.tokens = []
          }

          if (!item.meta.tokens) item.meta.tokens = []

          item.quantity += reward.quantity > 0 ? reward.quantity : 0
          item.meta.tokens.push(reward.key)

          await item.save()

          items.push(item.id)
        }

        rewardBag.items = items

        await rewardBag.save()

        character.inventory[character.inventoryIndex].items = [{ itemId: rewardBag.id, x: 1, y: 1 }]

        await character.save()
      }

      // Migrate characters
      if (Array.isArray(newProfile.meta.characters)) {
        newProfile.characters = []

        for (const character of newProfile.meta.characters) {
          if (!this.cache.Character[character.tokenId])
            this.cache.Character[character.tokenId] = await this.model.Character.findOne({
              token: character.tokenId,
            })

          if (!this.cache.Character[character.tokenId]) {
            console.log('Error finding character with token: ' + character.tokenId)
            continue
          }
          newProfile.characters.push({
            characterId: this.cache.Character[character.tokenId].id,
            meta: character,
          })
        }
      }

      // Migrate market

      // Migrate inventory

      // Migrate evolution
      if (!newProfile.stats) newProfile.stats = {}
      if (!newProfile.stats.evolution) newProfile.stats.evolution = {}

      newProfile.stats.craftedItemCount = newProfile.meta.craftedItemCount
      newProfile.stats.equippedItemCount = newProfile.meta.equippedItemCount
      newProfile.stats.transferredInCount = newProfile.meta.transferredInCount
      newProfile.stats.transferredOutCount = newProfile.meta.transferredOutCount
      newProfile.stats.marketTradeSoldCount = newProfile.meta.marketTradeSoldCount
      newProfile.stats.marketTradeListedCount = newProfile.meta.marketTradeListedCount
      newProfile.stats.evolution = newProfile.meta.evolution

      newProfile.teamId = this.cache.Team[newProfile.meta.overview?.guildId]?.id

      // Migrate overview

      // Migrate achievements
      if (Array.isArray(newProfile.meta.achievements)) {
        newProfile.achievements = []

        for (const achievement of newProfile.meta.achievements) {
          newProfile.achievements.push({
            achievementId: this.cache.Achievement[achievement].id,
            current: 1, // 1 = 100%
          })
        }
      }

      // @ts-ignore
      await newProfile.save()
    }

    process.stdout.write('\n')
  }

  async getProfileByAddress(address: string) {
    return (
      this.cache.Profile[address] ||
      (await this.model.Profile.findOne({
        address: address,
      })
        .populate('character')
        .exec())
    )
  }

  async getProfileByName(name: string) {
    return (
      this.cache.Profile[name] ||
      (await this.model.Profile.findOne({
        name: name,
      }).exec())
    )
  }

  async migrateClaims() {
    // @ts-ignore
    for (const claimRequest of claimRequests) {
      if (!claimRequest) continue

      const profile = await this.getProfileByAddress(claimRequest.address)

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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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

    // @ts-ignore
    for (const item of itemData) {
      if (!item.id) continue

      this.oldCache.Asset[item.id] = item

      if (this.cache.Asset[item.name]) {
        console.log('Asset ' + item.name + ' already exists')
        continue
      }

      console.log('Asset creating ', item.name)

      this.cache.Asset[item.name] = await this.model.Asset.findOne({
        key: item.id + '',
      }).exec()

      if (!this.cache.Asset[item.name]) {
        this.cache.Asset[item.name] = await this.model.Asset.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          name: item.name,
          key: item.id + '',
          meta: item,
          status: 'Active',
          uri:
            'https://arken.gg/item/' + item.name.replace(/ /gi, '-').replace("'", '').toLowerCase(),
          type: 'ERC-721',
          standard: 'ARX-1',
        })
      }

      // console.log(asset.id)
    }

    // {
    //   "name": "Arken Realm Shards",
    //   "symbol": "RXS",
    //   "address": "0x2098fef7eeae592038f4f3c4b008515fed0d5886",
    //   "chainId": 56,
    //   "decimals": 18,
    //   "logoURI": "/images/rune-500x500.png"
    // },

    const characterClasses = [
      { name: 'Warrior', id: 1 },
      { name: 'Mage', id: 2 },
      { name: 'Ranger', id: 3 },
      { name: 'Necromancer', id: 4 },
      { name: 'Paladin', id: 5 },
      { name: 'Assassin', id: 6 },
      { name: 'Druid', id: 7 },
    ]

    for (const item of characterClasses) {
      console.log('Asset creating ', item.name)

      this.cache.Asset[item.name] = await this.model.Asset.findOne({
        key: item.name + item.id + '',
      })

      if (!this.cache.Asset[item.name])
        this.cache.Asset[item.name] = await this.model.Asset.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          name: item.name,
          key: item.name + item.id + '',
          meta: item,
          status: 'Active',
          uri:
            'https://arken.gg/item/' + item.name.replace(/ /gi, '-').replace("'", '').toLowerCase(),
          type: 'NFT',
          standards: [this.cache.AssetStandard['ARX-1'], this.cache.AssetStandard['ERC-721']],
        })
    }

    const items = [
      {
        name: 'RUNE',
        symbol: 'RUNE',
        oldSymbol: 'RUNE',
        address: '0xa9776b590bfc2f956711b3419910a5ec1f63153e',
        chainId: 56,
        decimals: 18,
        logoURI: '/images/farms/rune.png',
      },
      {
        name: 'RXS',
        symbol: 'RXS',
        oldSymbol: 'RXS',
        address: '0x2098fef7eeae592038f4f3c4b008515fed0d5886',
        chainId: 56,
        decimals: 18,
        logoURI: '/images/farms/rxs.png',
      },
      {
        name: 'Ex Rune',
        symbol: 'EX',
        oldSymbol: 'EL',
        address: '0x210c14fbecc2bd9b6231199470da12ad45f64d45',
        chainId: 56,
        decimals: 18,
        id: 60,
        logoURI: '/images/farms/ex.png',
      },
      {
        name: 'Elm Rune',
        symbol: 'ELM',
        oldSymbol: 'ELD',
        address: '0xe00b8109bcb70b1edeb4cf87914efc2805020995',
        chainId: 56,
        decimals: 18,
        id: 61,
        logoURI: '/images/farms/elm.png',
      },
      {
        name: 'Eva Rune',
        symbol: 'EVA',
        oldSymbol: 'ETH',
        address: '0x919676B73a8d124597cBbA2E400f81Aa91Aa2450',
        chainId: 56,
        decimals: 18,
        id: 62,
        logoURI: '/images/farms/eva.png',
      },
      {
        name: 'TYR Rune',
        symbol: 'TYR',
        oldSymbol: 'TIR',
        address: '0x125a3e00a9a11317d4d95349e68ba0bc744addc4',
        chainId: 56,
        decimals: 18,
        id: 63,
        logoURI: '/images/farms/tyr.png',
      },
      {
        name: 'Nen Rune',
        symbol: 'NEN',
        oldSymbol: 'NEF',
        address: '0xef4f66506aaaeeff6d10775ad6f994105d8f11b4',
        chainId: 56,
        decimals: 18,
        id: 64,
        logoURI: '/images/farms/nen.png',
      },
      {
        name: 'Isa Rune',
        symbol: 'ISA',
        oldSymbol: 'ITH',
        address: '0x098Afb73F809D8Fe145363F802113E3825d7490C',
        chainId: 56,
        decimals: 18,
        id: 65,
        logoURI: '/images/farms/isa.png',
      },
      {
        name: 'Tato Rune',
        symbol: 'TATO',
        oldSymbol: 'TAL',
        address: '0x5DE72A6fca2144Aa134650bbEA92Cc919244F05D',
        chainId: 56,
        decimals: 18,
        id: 66,
        logoURI: '/images/farms/tato.png',
      },
      {
        name: 'Ro Rune',
        symbol: 'RO',
        oldSymbol: 'RAL',
        address: '0x2F25DbD430CdbD1a6eC184c79C56C18918fcc97D',
        chainId: 56,
        decimals: 18,
        id: 67,
        logoURI: '/images/farms/ro.png',
      },
      {
        name: 'Ore Rune',
        symbol: 'ORE',
        oldSymbol: 'ORT',
        address: '0x33bc7539D83C1ADB95119A255134e7B584cd5c59',
        chainId: 56,
        decimals: 18,
        id: 68,
        logoURI: '/images/farms/ore.png',
      },
      {
        name: 'Thal Rune',
        symbol: 'THAL',
        oldSymbol: 'THUL',
        address: '0x1fC5bffCf855B9D7897F1921363547681F6847Aa',
        chainId: 56,
        decimals: 18,
        id: 69,
        logoURI: '/images/farms/thal.png',
      },
      {
        name: 'Ash Rune',
        symbol: 'ASH',
        oldSymbol: 'AMN',
        address: '0x346C03fe8BE489baAAc5CE67e817Ff11fb580F98',
        chainId: 56,
        decimals: 18,
        id: 70,
        logoURI: '/images/farms/ash.png',
      },
      {
        name: 'Solo Rune',
        symbol: 'SOLO',
        oldSymbol: 'SOL',
        address: '0x4ffd3b8ba90f5430cda7f4cc4c0a80df3cd0e495',
        chainId: 56,
        decimals: 18,
        id: 71,
        logoURI: '/images/farms/solo.png',
      },
      {
        name: 'Sen Rune',
        symbol: 'SEN',
        oldSymbol: 'SHAEL',
        address: '0x56DeFe2310109624c20c2E985c3AEa63b9718319',
        chainId: 56,
        decimals: 18,
        id: 72,
        logoURI: '/images/farms/sen.png',
      },
      {
        name: 'Da Rune',
        symbol: 'DA',
        oldSymbol: 'DOL',
        address: '0x94F2E23c7422fa8c5A348a0E6D7C05b0a6C8a5b8',
        chainId: 56,
        decimals: 18,
        id: 73,
        logoURI: '/images/farms/da.png',
      },
      {
        name: 'Han Rune',
        symbol: 'HAN',
        oldSymbol: 'HEL',
        address: '0x0D3877152BaaC86D42A4123ABBeCd1178d784cC7',
        chainId: 56,
        decimals: 18,
        id: 74,
        logoURI: '/images/farms/han.png',
      },
      {
        name: 'Ion Rune',
        symbol: 'ION',
        oldSymbol: 'IO',
        address: '0xa00672c2a70E4CD3919afc2043b4b46e95041425',
        chainId: 56,
        decimals: 18,
        id: 75,
        logoURI: '/images/farms/ion.png',
      },
      {
        name: 'Lux Rune',
        symbol: 'LUX',
        oldSymbol: 'LUM',
        address: '0xD481F4eA902e207AAda9Fa093f80d50B19444253',
        chainId: 56,
        decimals: 18,
        id: 76,
        logoURI: '/images/farms/lux.png',
      },
      {
        name: 'Ka Rune',
        symbol: 'KA',
        oldSymbol: 'KO',
        address: '0x2a74b7d7d44025Bcc344E7dA80d542e7b0586330',
        chainId: 56,
        decimals: 18,
        id: 77,
        logoURI: '/images/farms/ka.png',
      },
      {
        name: 'Fus Rune',
        symbol: 'FUS',
        oldSymbol: 'FAL',
        address: '0xcd06c743a1628fB02C15946a56037CD7020F3Bd2',
        chainId: 56,
        decimals: 18,
        id: 78,
        logoURI: '/images/farms/fus.png',
      },
      {
        name: 'Leni Rune',
        symbol: 'LENI',
        oldSymbol: 'LEM',
        address: '0xFF0682D330C7a6381214fa541d8D288dD0D098ED',
        chainId: 56,
        decimals: 18,
        id: 79,
        logoURI: '/images/farms/leni.png',
      },
      {
        name: 'Pai Rune',
        symbol: 'PAI',
        oldSymbol: 'PUL',
        address: '0xfa3f14C55adaDDC2035083146c1cF768bD035E06',
        chainId: 56,
        decimals: 18,
        id: 80,
        logoURI: '/images/farms/pai.png',
      },
      {
        name: 'Uln Rune',
        symbol: 'ULN',
        oldSymbol: 'UM',
        address: '0x7e8a6d548a68339481c500f2B56367698A9F7213',
        chainId: 56,
        decimals: 18,
        id: 81,
        logoURI: '/images/farms/uln.png',
      },
      {
        name: 'Mor Rune',
        symbol: 'MOR',
        oldSymbol: 'MAL',
        address: '0xdfFeB26FbaCF79823C50a4e7DCF69378667c9941',
        chainId: 56,
        decimals: 18,
        id: 82,
        logoURI: '/images/farms/mor.png',
      },
      {
        name: 'Isk Rune',
        symbol: 'ISK',
        oldSymbol: 'IST',
        address: '0x90132915EbDe0CF93283D55AB3fBBA15449f95A9',
        chainId: 56,
        decimals: 18,
        id: 83,
        logoURI: '/images/farms/isk.png',
      },
      {
        name: 'Gon Rune',
        symbol: 'GON',
        oldSymbol: 'GUL',
        address: '0xa89805AB2ca5B70c89B74b3B0346a88a5B8eAc85',
        chainId: 56,
        decimals: 18,
        id: 84,
        logoURI: '/images/farms/gon.png',
      },
      {
        name: 'Val Rune',
        symbol: 'VAL',
        oldSymbol: 'VEX',
        address: '0x60E3538610e9f4974A36670842044CB4936e5232',
        chainId: 56,
        decimals: 18,
        id: 85,
        logoURI: '/images/farms/val.png',
      },
      {
        name: 'Oh Rune',
        symbol: 'OH',
        oldSymbol: 'OHM',
        address: '0x9449D198AB998388a577D4eBfDa4656D9fa3468a',
        chainId: 56,
        decimals: 18,
        id: 86,
        logoURI: '/images/farms/oh.png',
      },
      {
        name: 'Lor Rune',
        symbol: 'LO',
        oldSymbol: 'LO',
        address: '0x08fb6740Cc5170e48B2Ad8Cc07422d3302EF5e78',
        chainId: 56,
        decimals: 18,
        id: 87,
        logoURI: '/images/farms/lor.png',
      },
      {
        name: 'Su Rune',
        symbol: 'SU',
        oldSymbol: 'SUR',
        address: '0x191472E8E899E98048AeB82faa1AE4Ec3801b936',
        chainId: 56,
        decimals: 18,
        id: 88,
        logoURI: '/images/farms/su.png',
      },
      {
        name: 'Beru Rune',
        symbol: 'BERU',
        oldSymbol: 'BER',
        address: '0x1656f8d69F2354a9989Fe705c0107190A4815287',
        chainId: 56,
        decimals: 18,
        id: 89,
        logoURI: '/images/farms/beru.png',
      },
      {
        name: 'Jua Rune',
        symbol: 'JUA',
        oldSymbol: 'JAH',
        address: '0xBC996F2f6703cc13AA494F846A1c563A4A0f1A80',
        chainId: 56,
        decimals: 18,
        id: 90,
        logoURI: '/images/farms/jua.png',
      },
      {
        name: 'Chin Rune',
        symbol: 'CHIN',
        oldSymbol: 'CHAM',
        address: '0xfb134f1721bc602Eb14148f89e1225dC7C93D8d4',
        chainId: 56,
        decimals: 18,
        id: 91,
        logoURI: '/images/farms/chin.png',
      },
      {
        name: 'Zeno Rune',
        symbol: 'ZENO',
        oldSymbol: 'ZOD',
        address: '0x3e151ca82b3686f555c381530732df1cfc3c7890',
        chainId: 56,
        decimals: 18,
        id: 92,
        logoURI: '/images/farms/zeno.png',
      },
    ]

    // @ts-ignore
    for (const item of items) {
      if (!item.id) continue

      this.oldCache.Asset[item.id] = item

      console.log('ChainToken creating ', item.name)

      this.cache.ChainContract[item.name] = await this.model.ChainContract.findOne({
        chainId: this.cache.Chain.BSC.id,
        address: item.address,
      }).exec()

      if (!this.cache.ChainContract[item.name])
        this.cache.ChainContract[item.name] = await this.model.ChainContract.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          name: item.name,
          key: this.cache.Application.Arken.key + this.cache.Chain.BSC.key + item.address + '',
          meta: item,
          status: 'Active',
          type: 'Token',
          standards: [this.cache.AssetStandard['ERC-20']],
          address: item.address,
        })

      this.cache.ChainToken[item.name] = await this.model.ChainToken.findOne({
        chainId: this.cache.Chain.BSC.id,
        address: item.address,
      })

      if (!this.cache.ChainToken[item.name])
        this.cache.ChainToken[item.name] = await this.model.ChainToken.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          chainContractId: this.cache.ChainContract[item.name].id,
          symbol: item.symbol,
          name: item.name,
          key: this.cache.Application.Arken.key + this.cache.Chain.BSC.key + item.address + '',
          meta: item,
          status: 'Active',
          address: item.address,
          decimals: item.decimals,
        })

      console.log('Asset creating ', item.name)

      this.cache.Asset[item.name] = await this.model.Asset.findOne({
        key: item.id + '',
      })

      if (!this.cache.Asset[item.name])
        this.cache.Asset[item.name] = await this.model.Asset.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          name: item.name,
          key: item.id + '',
          meta: item,
          status: 'Active',
          uri:
            'https://arken.gg/item/' + item.name.replace(/ /gi, '-').replace("'", '').toLowerCase(),
          type: 'NFT',
          standards: item.name.includes('Rune')
            ? [this.cache.AssetStandard['ARX-1'], this.cache.AssetStandard['ERC-721']]
            : [this.cache.AssetStandard['ERC-20']],
        })

      // console.log(asset.id)
    }
  }

  async migrateStats() {
    console.log('Migrating stats')

    const game = this.cache.Game['Runic Raids']
    const key = 'latest'

    this.cache.GameStat[key] = await this.model.GameStat.findOne({
      key,
    })

    if (!this.cache.GameStat[key]) {
      this.cache.GameStat[key] = await this.model.GameStat.create({
        applicationId: this.cache.Application.Arken.id,
        key,
        status: 'Active',
        gameId: game.id,
        meta: {
          ...stats,
          runes,
        },
      })

      game.statId = this.cache.GameStat[key].id

      await game.save()
    }
  }

  async migrateAssetStandards() {
    const standards = [
      'ERC-20',
      'ERC-721',
      'ERC-1155',
      'ERC-4626',
      'ERC-777',
      'ERC-2981',
      'ERC-223',
      'ERC-827',
      'ERC-137',
      'ERC-1820',
      'ERC-725',
      'ERC-735',
      'ERC-4337',
      'ARX-1',
    ]

    for (const name of standards) {
      this.cache.AssetStandard[name] = await this.model.AssetStandard.findOne({
        key: name + '',
      })

      if (!this.cache.AssetStandard[name]) {
        this.cache.AssetStandard[name] = await this.model.AssetStandard.create({
          applicationId: this.cache.Application.Arken.id,
          name: name,
          key: name + '',
          status: 'Active',
          parentId: name === 'ARX-1' ? this.cache.AssetStandard['ERC-721'].id : undefined,
        })
      }
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
    //     omniverseId: this.cache.Omniverse.Arken.id,
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
    // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}
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
      const trades = profile.meta?.market?.trades
      if (!trades || !Array.isArray(trades) || trades.length === 0) continue
      console.log(trades)
      // return
    }
    // @ts-ignore
    for (const trade of trades) {
      const buyer =
        trade.buyer !== '0x0000000000000000000000000000000000000000'
          ? await this.model.Profile.findOne({ address: trade.buyer }).exec()
          : null
      const owner = await this.model.Profile.findOne({ address: trade.seller })
        .populate('character')
        .exec()

      // cant find user? look in filesystem
      const decodedItem = decodeItem(trade.tokenId)

      this.cache.Item[decodedItem.tokenId] = await this.model.Item.findOne({
        key: decodedItem.tokenId,
      }).exec()

      // TODO: create item based on token
      // if its multiple items for a trade, create an item that groups them together.. a Trade Box

      if (!this.cache.Item[decodedItem.tokenId])
        this.cache.Item[decodedItem.tokenId] = await this.model.Item.create({
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          assetId: this.cache.Asset[decodedItem.name].id,
          key: decodedItem.tokenId,
          meta: decodedItem,
          name: decodedItem.name,
          token: decodedItem.tokenId,
          status: 'Active',
          distribution: {
            Unknown: 'Unknown',
            Fundraiser: 'Fundraiser',
            Crafted: 'Crafted',
            Airdrop: 'Airdrop',
            'Airdropped on TYR holders': 'Airdrop',
            Reward: 'Reward',
            'Evolution Battles': 'Reward',
            'Quiz Reward': 'Reward',
            Farmed: 'Farmed',
            farmed: 'Farmed',
            'Farmed by ARKEN characters': 'Farmed',
            Claimed: 'Claimed',
            Claimable: 'Claimed',
            'Airdropped on RUNE characters': 'Airdrop',
          }[
            Array.isArray(decodedItem.details.Distribution)
              ? decodedItem.details.Distribution[0]
              : decodedItem.details.Distribution
          ],
          characterId: owner.character.id,
          materialId: this.cache.ItemMaterial[decodedItem.material]?.id,
          skinId: this.cache.ItemSkin[decodedItem.skin]?.id, // TODO: convert the skin mapper stuff to items, and get the skin item from there
          recipeId: this.cache.ItemRecipe[decodedItem.recipe]?.id,
          typeId: this.cache.ItemType[decodedItem.type]?.id,
          subTypeId: this.cache.ItemSubType[decodedItem.subType]?.id,
          specificTypeId: this.cache.ItemSpecificType[decodedItem.specificType]?.id,
          rarityId: this.cache.ItemRarity[decodedItem.rarity]?.id,
          slotId: this.cache.ItemSlot[decodedItem.slot]?.id,
          setId: this.cache.ItemSet[decodedItem.set]?.id,
          attributes: [],
          quantity: 1,
          x: undefined,
          y: undefined,
          // properties: z.record(z.any()).optional(),
          // type: z.string().default('bag'), // stash, bag, equipment, etc.
          // TODO: use this for the transmog / skin stuff, ingame, check if type === skin
          items: [],
          capacity: undefined,
          points: 0,
        })

      // const asset = find asset by trade.item.id + ''
      this.cache.Trade[trade.id + ''] = await this.model.Trade.findOne({
        key: trade.id + '',
      })

      if (!this.cache.Trade[trade.id + '']) {
        this.cache.Trade[trade.id + ''] = await this.model.Trade.create({
          applicationId: this.cache.Application.Arken.id,
          ownerId: owner.id,
          buyerId: buyer?.id,
          key: trade.id + '',
          itemId: this.cache.Item[decodedItem.tokenId].id,
          meta: {
            ...trade,
            contractVersion: 2,
            contractAddress: '0xa9b9195b19963f2d72a7f56bad3705ba536cdb66',
          },
          status: {
            available: 'Available',
            delisted: 'Delisted',
            sold: 'Sold',
          }[trade.status],
        })
      }
    }
  }

  async migrateOldTrades() {
    // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}
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
      const trades = profile.meta?.market?.trades
      if (!trades || !Array.isArray(trades) || trades.length === 0) continue
      console.log('Trades', trades)
      // return
    }
    // @ts-ignore
    for (const trade of oldTrades) {
      const buyer =
        trade.buyer !== '0x0000000000000000000000000000000000000000'
          ? await this.getProfileByAddress(trade.buyer)
          : null
      const owner = await this.getProfileByAddress(trade.seller)
      console.log('Trade', trade)
      if (!owner) {
        problemProfiles[trade.seller] = 1
        continue
        // throw new Error('Profile owner not found ' + trade.seller)
      }

      // cant find user? look in filesystem
      const decodedItem = decodeItem(trade.tokenId)

      console.log('Creating trade for', decodedItem.name)

      this.cache.Item[decodedItem.tokenId] = await this.model.Item.findOne({
        key: decodedItem.tokenId,
      }).exec()

      // console.log(this.cache.Application.Arken, this.cache.Chain.BSC)

      // TODO: needs lots of love
      if (!this.cache.Item[decodedItem.tokenId])
        this.cache.Item[decodedItem.tokenId] = await this.model.Item.create({
          characterId: owner.character.id,
          applicationId: this.cache.Application.Arken.id,
          chainId: this.cache.Chain.BSC.id,
          assetId: this.cache.Asset[decodedItem.name].id,
          key: decodedItem.tokenId,
          meta: decodedItem,
          name: decodedItem.name,
          token: decodedItem.tokenId,
          status: 'Active',
        })

      // const asset = find asset by trade.item.id + ''
      this.cache.Trade[trade.id + ''] = await this.model.Trade.findOne({
        key: trade.id + '',
      }).exec()

      if (!this.cache.Trade[trade.id + ''])
        this.cache.Trade[trade.id + ''] = await this.model.Trade.create({
          applicationId: this.cache.Application.Arken.id,
          ownerId: owner.id,
          buyerId: buyer?.id,
          itemId: this.cache.Item[decodedItem.tokenId].id,
          key: trade.id + '',
          meta: {
            ...trade,
            contractVersion: 1,
            contractAddress: '0xdAE69A43bC73e662095b488dbDDD1D3aBA59c1FF',
          },
          status: {
            available: 'Active',
            delisted: 'Delisted',
            sold: 'Sold',
          }[trade.status],
        })
    }

    console.log('Problem profiles', JSON.stringify(problemProfiles))
  }

  async migrateTeams() {
    console.log('Migrating teams')
    // const overview = guild1OverviewData

    // "memberCount": 54,
    // "activeMemberCount": 37,
    // "points": 1267,
    // "name": "The First Ones",
    // "description": "Formed after the discovery of a cache of hidden texts in an abandoned, secret Horadric meeting place. This group of scholars was brought together by Bin Zy.",
    // "icon": "/images/teams/the-first-ones.png",
    // "backgroundColor": "#fff",
    // "discord": { "role": "862170863827025950", "channel": "862153263804448769" },
    const teams = await this.model.Team.find()
    for (const team of teams) {
      if (!this.cache.Team[team.name]) {
        this.cache.Team[team.name] = team
        this.cache.Team[team.meta.id] = team
      }
    }

    const oldTeamData = [
      {
        id: 1,
        name: 'The First Order',
        description: 'Scholars and time mages brought together by Bin Zy in the service of Zeno.',
        images: {
          lg: 'the-first-ones.png',
          md: 'the-first-ones.png',
          sm: 'the-first-ones.png',
          alt: 'the-first-ones.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-first-ones.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 2,
        name: 'The Archivists',
        description: "Keepers of lore and the guardians of Haerra's history.",
        images: {
          lg: 'the-archivists.png',
          md: 'the-archivists.png',
          sm: 'the-archivists.png',
          alt: 'the-archivists.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-archivists.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 3,
        name: 'Knights of Westmarch',
        description: 'Knights of purity and enforcers of justice.',
        images: {
          lg: 'knights-of-westmarch.png',
          md: 'knights-of-westmarch.png',
          sm: 'knights-of-westmarch.png',
          alt: 'knights-of-westmarch.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/knights-of-westmarch.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 4,
        name: 'The Protectors',
        description:
          'After the destruction of the Worldstone, these dark souls serve Azorag in the destruction of all living things.',
        images: {
          lg: 'the-protectors.png',
          md: 'the-protectors.png',
          sm: 'the-protectors.png',
          alt: 'the-protectors.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-protectors.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 5,
        name: 'The Destroyers',
        description:
          'After the destruction of the Worldstone, these survivors banded together to find and protect the Worldstone shards from falling into the hands of evil.',
        images: {
          lg: 'the-destroyers.png',
          md: 'the-destroyers.png',
          sm: 'the-destroyers.png',
          alt: 'the-destroyers.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-destroyers.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 6,
        name: 'Drocos Legion',
        description:
          'Dragon riders and defenders, this elite group seeks to defend the few remaining dragons from the onslaught of humanoids.',
        images: {
          lg: 'drocos-legion.png',
          md: 'drocos-legion.png',
          sm: 'drocos-legion.png',
          alt: 'drocos-legion.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/drocos-legion.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 7,
        name: 'Heden Saf',
        description:
          'A group of clerics and miracle-workers dedicated to the Cull: the eradication of all non-energy users in Haerra.',
        images: {
          lg: 'heden-saf.png',
          md: 'heden-saf.png',
          sm: 'heden-saf.png',
          alt: 'heden-saf.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/heden-saf.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      {
        id: 8,
        name: 'Radiant Viziers',
        description:
          'The Radiant Viziers are a group of expert fighters dedicated to Relia, with bastions of influence all over Haerra.',
        images: {
          lg: 'radiant-viziers.png',
          md: 'radiant-viziers.png',
          sm: 'radiant-viziers.png',
          alt: 'radiant-viziers.png',
          ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/radiant-viziers.png',
        },
        background: 'guild.svg',
        textColor: '#fff',
      },
      // {
      //   id: 7,
      //   name: 'Seers of Hexgard',
      //   description:
      //     'Deep within the twisted forests of Hexgard, these fearsome oracles seek wisdom from the otherworldly.',
      //   images: {
      //     lg: 'seers-of-hexgard.png',
      //     md: 'seers-of-hexgard.png',
      //     sm: 'seers-of-hexgard.png',
      //     alt: 'seers-of-hexgard.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/seers-of-hexgard.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 8,
      //   name: 'Guildmasters of Qiddir',
      //   description:
      //     'A people of order and expertise, dedicated to crafting marvelous and practical inventions to solve Haerra\'s problems.',
      //   images: {
      //     lg: 'guildmasters-of-qiddir.png',
      //     md: 'guildmasters-of-qiddir.png',
      //     sm: 'guildmasters-of-qiddir.png',
      //     alt: 'guildmasters-of-qiddir.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/guildmasters-of-qiddir.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 9,
      //   name: 'Alchemists of Tabr',
      //   description:
      //     'A people of chaos and unchained scientific pursuit, dedicated to wild progress and free innovation.',
      //   images: {
      //     lg: 'alchemists-of-tabr.png',
      //     md: 'alchemists-of-tabr.png',
      //     sm: 'alchemists-of-tabr.png',
      //     alt: 'alchemists-of-tabr.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/alchemists-of-tabr.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 6,
      //   name: 'Brotherhood of Vtello',
      //   description:
      //     'The most skilled assassins in Haerra, bound together by fraternity and coin.',
      //   images: {
      //     lg: 'brotherhood-of-vtello.png',
      //     md: 'brotherhood-of-vtello.png',
      //     sm: 'brotherhood-of-vtello.png',
      //     alt: 'brotherhood-of-vtello.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/brotherhood-of-vtello.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'Forest Dwellers of Tilia',
      //   description:
      //     'Legendary archers and protectors of the Ashyrah forests.',
      //   images: {
      //     lg: 'forest-dwellers-of-tilia.png',
      //     md: 'forest-dwellers-of-tilia.png',
      //     sm: 'forest-dwellers-of-tilia.png',
      //     alt: 'forest-dwellers-of-tilia.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/forest-dwellers-of-tilia.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'Tribe of the Great Faytree',
      //   description:
      //     'Protectors of the Faytree and speakers of the wild.',
      //   images: {
      //     lg: 'tribe-of-the-great-faytree.png',
      //     md: 'tribe-of-the-great-faytree.png',
      //     sm: 'tribe-of-the-great-faytree.png',
      //     alt: 'tribe-of-the-great-faytree.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/tribe-of-the-great-faytree.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'Ragor Necrologists',
      //   description:
      //     'Mysterious scholars of the undead and stewards of the spirit world.',
      //   images: {
      //     lg: 'ragor-necrologists.png',
      //     md: 'ragor-necrologists.png',
      //     sm: 'ragor-necrologists.png',
      //     alt: 'ragor-necrologists.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/ragor-necrologists.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'The Tribe of Carnage',
      //   description:
      //     '	One with blood and blade, the rage of these barbarians knows no bounds.',
      //   images: {
      //     lg: 'the-tribe-of-carnage.png',
      //     md: 'the-tribe-of-carnage.png',
      //     sm: 'the-tribe-of-carnage.png',
      //     alt: 'the-tribe-of-carnage.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-tribe-of-carnage.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'Paladins of Ashyrah',
      //   description:
      //     'A group of upright fighters who adhere to a strict code instead of the dictates of a single religion.',
      //   images: {
      //     lg: 'the-tribe-of-carnage.png',
      //     md: 'the-tribe-of-carnage.png',
      //     sm: 'the-tribe-of-carnage.png',
      //     alt: 'the-tribe-of-carnage.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/the-tribe-of-carnage.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
      // {
      //   id: 7,
      //   name: 'Wardens of Irondell',
      //   description:
      //     'Watchers over the Fayhelm forests and guardians of Irondell.',
      //   images: {
      //     lg: 'wardens-of-irondell.png',
      //     md: 'wardens-of-irondell.png',
      //     sm: 'wardens-of-irondell.png',
      //     alt: 'wardens-of-irondell.png',
      //     ipfs: process.env.REACT_APP_PUBLIC_URL + 'images/teams/wardens-of-irondell.png',
      //   },
      //   background: 'guild.svg',
      //   textColor: '#fff',
      //   users: 0,
      //   activeMemberCount: 0,
      //   memberCount: 0,
      //   points: 0,
      // },
    ]

    for (const guild of guildsData) {
      // if (this.cache.Team[guild.id]) {
      //   console.log('Guild with name ' + this.cache.Team[guild.id].name + ' already exists.')
      //   continue
      // }

      const details = jetpack.read(path.resolve(`../data/guilds/${guild.id}/overview.json`), 'json')

      this.cache.Team[details.name] = await this.model.Team.findOne({ key: details.name })

      if (!this.cache.Team[details.name]) {
        this.cache.Team[details.name] = await this.model.Team.create({
          applicationId: this.cache.Application.Arken.id,
          name: details.name,
          description: details.description,
          key: details.name,
          meta: details,
          status: 'Active',
        })
      }

      this.cache.Team[guild.id] = this.cache.Team[details.name]

      const team = this.cache.Team[details.name]

      if (!team.meta.images) {
        team.meta = { ...team.meta, ...oldTeamData.find((t: any) => t.name === team.name) }

        await team.save()
      }

      console.log('Guild with name ' + details.name)

      // TODO
      const memberDetails = jetpack.read(
        path.resolve(`../data/guilds/${guild.id}/memberDetails.json`),
        'json'
      )

      // {
      //   "address": "0xa94210Bce97C665aCd1474B6fC4e9817a456EECd",
      //   "username": "kucka",
      //   "points": 1,
      //   "achievementCount": 1,
      //   "isActive": true,
      //   "characterId": 6
      // },
      for (const member of memberDetails) {
        const profile = await this.model.Profile.findOne({ address: member.address }).populate(
          'characters'
        )

        if (profile) {
          console.log('Character with guild ' + details.name + ' for profile ' + member.address)

          if (profile.points <= 0) profile.points = member.points
          if (!profile.teamId) profile.teamId = this.cache.Team[guild.id].id

          await profile.save()

          // this.cache.Character[profile.id] = await this.model.Character.findOne({
          //   token: profile.id,
          // })

          // if (!this.cache.Character[profile.id]) {
          //   // this.cache.Character[profile.id] = await this.model.Character.create({
          //   //   applicationId: this.cache.Application.Arken.id,
          //   //   name: character.name,
          //   //   key: profile.id,
          //   //   meta: character,
          //   //   status: 'Active',
          //   //   ownerId: newProfile.id,
          //   //   token: profile.id,
          //   //   classId: this.cache.CharacterClass[character.id],
          //   // })
          //   console.log(`Character for guild doesn't exist: ${profile.id}`)
          // }
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
    // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Runeform": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}

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

    for (const item of achievements) {
      this.oldCache.Achievement[item.id] = item

      if (item.icon) item.icon = item.icon.replace('undefined', '')

      // Check if the achievement already exists in MongoDB
      this.cache.Achievement[item.key] = await this.model.Achievement.findOne({ key: item.key })
      if (!this.cache.Achievement[item.key]) {
        console.log(`Inserted achievement with key: ${item.key}`)
        // Insert the achievement into MongoDB
        this.cache.Achievement[item.key] = await this.model.Achievement.create({
          applicationId: this.cache.Application.Arken.id,
          name: item.name,
          description: '',
          key: item.key,
          meta: item,
          status: item.isEnabled ? 'Active' : 'Pending',
        })
      }

      this.cache.Achievement[item.id] = this.cache.Achievement[item.key]
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
      this.cache.Area[item.id] = this.cache.Area[item.name] = await this.model.Area.findOne({
        name: item.name,
      })
      if (this.cache.Area[item.id]) {
        console.log(`Area with name ${item.name} already exists.`)
        continue
      }

      // Insert the area into MongoDB
      this.cache.Area[item.id] = this.cache.Area[item.name] = await this.model.Area.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })

      // TODO: relationships
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

  async migrateCharacters() {
    console.log('Migrating characters')

    for (const item of characters) {
      this.oldCache.Character[item.id] = item
      if (!item.name) continue

      this.cache.Character[item.name] = await this.model.Character.findOne({
        key: item.id + '',
      })

      if (this.cache.Character[item.name]) {
        console.log(`Character with name ${item.name} already exists.`)
        continue
      }
      console.log(item.types)
      this.cache.Character[item.name] = await this.model.Character.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: 'Active',
        token: item.id + '',
        // race: this.cache.CharacterRace[item.race].id,
        areaIds: item.areas.map((areaId) => this.cache.Area[areaId]?.id).filter((val) => !!val),
        typeIds: item.types
          .map((typeId) => this.cache.CharacterType[typeId]?.id)
          .filter((val) => !!val),
        itemMaterialIds: item.itemMaterials
          .map((materialId) => this.cache.ItemMaterial[materialId]?.id)
          .filter((val) => !!val),
      })
    }

    for (const item of npcs) {
      this.oldCache.Character[item.id] = item
      if (!item.name) continue

      this.cache.Character[item.name] = await this.model.Character.findOne({
        key: item.id + '',
      })

      if (this.cache.Character[item.name]) {
        console.log(`Character with name ${item.name} already exists.`)
        continue
      }

      this.cache.Character[item.name] = await this.model.Character.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        token: item.id + '',
        meta: item,
        isPrimary: true,
        status: item.isEnabled ? 'Active' : 'Pending',
        raceId: this.cache.CharacterRace[item.characterRace].id,
        energyIds: item.energies.map((energyId) => this.cache.Energy[energyId].id),
        typeIds: item.characterTypes.map((typeId) => this.cache.CharacterType[typeId].id),
      })
    }
  }

  async migrateCharacterAttributes() {
    console.log('Migrating character attributes')

    for (const item of characterAttributes) {
      this.oldCache.CharacterAttribute[item.id] = item
      if (!item.name) continue

      this.cache.CharacterAttribute[item.name] = await this.model.CharacterAttribute.findOne({
        key: item.id + '',
      })

      if (this.cache.CharacterAttribute[item.name]) {
        console.log(`Character attribute with name ${item.name} already exists.`)
        continue
      }

      this.cache.CharacterAttribute[item.name] = await this.model.CharacterAttribute.create({
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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

      this.cache.ItemTransmuteRule[item.name] = await this.model.ItemTransmuteRule.findOne({
        name: item.name,
      })
      if (this.cache.ItemTransmuteRule[item.name]) continue

      this.cache.ItemTransmuteRule[item.name] = await this.model.ItemTransmuteRule.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })

      await this.cache.ItemTransmuteRule[item.name].save()
    }
  }

  async migrateCharacterTitles() {
    for (const item of characterTitles) {
      this.oldCache.CharacterTitle[item.id] = item
      if (!item.name) continue

      const existingItem = await this.model.CharacterTitle.findOne({ name: item.name })
      if (existingItem) continue

      const newCharacterTitle = await this.model.CharacterTitle.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateCharacterTypes() {
    for (const item of characterTypes) {
      console.log('Migrating character type', item)
      this.oldCache.CharacterType[item.id] = item
      if (!item.name) continue

      this.cache.CharacterType[item.id] = await this.model.CharacterType.findOne({
        name: item.name,
      })

      if (this.cache.CharacterType[item.id]) continue

      this.cache.CharacterType[item.id] = await this.model.CharacterType.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
        // TODO: add areas
      })
    }
  }

  async migrateActs() {
    for (const item of acts) {
      this.oldCache.Act[item.id] = item
      this.cache.Act[item.id] = await this.model.Act.findOne({ name: item.name })

      if (this.cache.Act[item.id]) continue

      this.cache.Act[item.id] = await this.model.Act.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
        characterIds: item.townNpcs
          .map((characterId) => this.cache.Character[characterId]?.id)
          .filter((val) => !!val),
      })
    }
  }

  async migrateEras() {
    for (const item of eras) {
      this.oldCache.Era[item.id] = item

      this.cache.Era[item.id] = await this.model.Era.findOne({ name: item.name })
      if (this.cache.Era[item.id]) continue

      this.cache.Era[item.id] = await this.model.Era.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })
    }
  }

  async migratePlanets() {
    for (const item of planets) {
      this.oldCache.Planet[item.id] = item

      this.cache.Planet[item.id] = await this.model.Planet.findOne({ name: item.name })

      if (this.cache.Planet[item.id]) continue

      this.cache.Planet[item.id] = await this.model.Planet.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
      // "name": "Runic Raids",
      // "link": "https://arken.gg/game/raids",
      // "primaryColor": "red",
      // "secondaryColor": "white",
      // "logoLink": "/images/games/rune-raid-logo.png",
      // "shortDescription": "Arken is an addicting dark fantasy RPG. Play and earn runes (crypto) battling players and AI. Use runes to craft gear (NFTs) to make your character more powerful.",
      // "description": "The Future DeFi and Gaming Ecosystem\n\nHybrid gaming ecosystem which utilizes NFT game assets, seamless integration into a conventional game.\n",
      // "storyline": "",
      // "cmcDescription": "## What is Arken Realm Shards (RXS)?\n\n[Arken Realms](https://coinmarketcap.com/currencies/rxs/) is an open-ended dark fantasy gaming universe built on [Binance Smart Chain](https://coinmarketcap.com/alexandria/article/what-is-binance-smart-chain), where players can battle, join a guild, collect powerful weapons, and earn [NFTs](https://coinmarketcap.com/alexandria/glossary/non-fungible-token) and cryptocurrency in the form of runes by playing.\n\nRunes are small and rare stones inscribed with magical glyphs needed to craft Runeforms (NFTs), weapons, and armor. 33 different Runes are distributed to players over two years. Each Rune has a supply of 100,000 or less, and players can earn Runes by competing against other players, joining guilds, participating in yield farms, and community participation.\n\nThe Rune universe consists of Evolution Isles, a play-to-earn game, Runic Raids, the yield farm, Runeforms (NFTs), and the Infinite Arena Arena, a player-versus-player game. The team is also developing the Heart of the Oasis, an MMORPG that will be launched in 2022. Currently, Arken is running on BSC, but the team sees the universe as blockchain-agnostic and is building a bridge to [Polygon](https://coinmarketcap.com/currencies/polygon/).\n\n## Who Are the Founders of Rune?\n\nArken's founders are anonymous. The team chose to stay anonymous to protect itself, its associates, and users from “archaic legislation imposed by governments who won’t understand the emerging DeFi field for years to come.” The team alludes to “Binzy,” which is their fill-in for the person(s) behind Rune, a real software engineer with 20 years of experience and connections in the crypto world.\nIn total, the team consists of 12 people: the lead dev, four unity developers, a React developer, a Solidity developer, two consultant developers, two consultant project managers, one marketing manager, one community manager, four mods and some advisors.\n\n## What Makes Rune Unique?\n\nRune offers an attractive mix of blockchain gaming, NFTs, and elements from decentralized finance. Its universe is split into four different parts.\n\nEvolution Isles is a play-to-earn game and was the first game built for the ecosystem. You start as a dragonling that can fly around and eat sprites to evolve into a dragon eventually. One round in the web browser-based game lasts five minutes, and players can earn crypto as a reward.\n\nRunic Raids is the yield farm that attracts liquidity to the ecosystem. You can acquire runes through providing liquidity and raiding farms, i.e., yield farming. The team promises that since the supply of runes is limited, their price should find a bottom. Moreover, each rune has its specific utility, and runes can also be combined to build Runeforms. Furthermore, for 2022, an online RPG built around runes is in development.\n\nRuneforms (NFTs) are unique weapons and armor. Each Runeform is suitable for a specific hero class (seven different hero classes exist) or style of play. Runeforms improve a hero’s capabilities in battle and offer improved farming and merchant abilities. Runeforms are shared, collected, and traded in the Arken Market and players will soon be able to lend them to others. Runeforms are crafted from runes.\n\nFinally, the Infinite Arena Arena is a player-versus-player, web-based 2D topdown game, where you battle your opponents for prizes. Once you defeat an opponent, they go back to the beginning while you can continue the path that goes on infinitely. The last one standing after one minute of battle claims a reward in the form of crypto or NFTs. Every 15 minutes, you enter a new arena.\n",
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
            omniverseId: this.cache.Omniverse.Arken.id,
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
            applicationId: this.cache.Application.Arken.id,
            name: item.name,
            key: item.name,
            status: 'Active',
          })
        }
      }

      if (!this.cache.Game[item.name]) {
        this.cache.Game[item.name] = await this.model.Game.findOne({
          name: item.name,
        }).exec()

        if (!this.cache.Game[item.name]) {
          this.cache.Game[item.name] = await this.model.Game.create({
            applicationId: this.cache.Application.Arken.id,
            productId: this.cache.Game[item.name].id,
            name: item.name,
            description: item.description,
            key: item.name,
            meta: item,
            status: 'Active',
          })
        }
      }
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
        console.log(`Guide with name ${item.name} (${item.uuid}) already exists.`)
        continue
      }

      // Insert the game guide into MongoDB
      this.cache.Guide[item.uuid] = await this.model.Guide.create({
        applicationId: this.cache.Application.Arken.id,
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

      if (this.cache.CharacterClass[item.id]) {
        console.log('CharacterClass ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterClass[item.id] = await this.model.CharacterClass.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.isPlayable ? 'Active' : 'Pending',
      })
    }
  }

  async migrateCharacterFactions() {
    this.cache.Application.Arken = await this.model.Application.findOne({
      key: 'arken',
    })

    for (const item of characterFactions) {
      if (!item.name) continue

      this.cache.CharacterFaction[item.id] = await this.model.CharacterFaction.findOne({
        name: item.name,
      })
      if (this.cache.CharacterFaction[item.id]) {
        console.log('CharacterFaction ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterFaction[item.id] = await this.model.CharacterFaction.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      })
    }
  }

  async migrateCharacterGenders() {
    this.cache.Application.Arken = await this.model.Application.findOne({
      key: 'arken',
    })

    for (const item of characterGenders) {
      if (!item.name) continue

      this.cache.CharacterGender[item.id] = await this.model.CharacterGender.findOne({
        name: item.name,
      })
      if (this.cache.CharacterGender[item.id]) {
        console.log('CharacterGender ' + item.name + ' already exists')
        continue
      }

      this.cache.CharacterGender[item.id] = await this.model.CharacterGender.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        key: item.name,
        meta: item,
        status: 'Active',
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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

      this.cache.Energy[item.id] = this.cache.Energy[item.name] = await this.model.Energy.findOne({
        name: item.name,
      })

      if (this.cache.Energy[item.id]) {
        console.log('Energy ' + item.name + ' already exists')
        continue
      }

      this.cache.Energy[item.id] = this.cache.Energy[item.name] = await this.model.Energy.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateAreaTypes() {
    for (const item of areaTypes) {
      if (!item.name) continue

      const existingItem = await this.model.AreaType.findOne({ name: item.name })
      if (existingItem) continue

      const newAreaType = await this.model.AreaType.create({
        name: item.name,
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

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
        applicationId: this.cache.Application.Arken.id,
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

      if (this.cache.BiomeFeature[item.id]) {
        console.log('BiomeFeature ' + item.name + ' already exists')
        continue
      }

      this.cache.BiomeFeature[item.name] = await this.model.BiomeFeature.create({
        applicationId: this.cache.Application.Arken.id,
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

      this.cache.ItemSpecificType[item.name] = await this.model.ItemSpecificType.findOne({
        name: item.name,
      })
      this.oldCache.ItemSpecificType[item.id] = this.cache.ItemSpecificType[item.name]

      if (this.cache.ItemSpecificType[item.id]) {
        console.log('Item specificType ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSpecificType[item.name] = await this.model.ItemSpecificType.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })

      this.oldCache.ItemSpecificType[item.id] = this.cache.ItemSpecificType[item.name]
    }
  }

  async migrateItemAffixes() {
    for (const item of itemAffixes) {
      if (!item.name) continue

      // "uuid": "recsKNa2xQIxHlbFO",
      // "id": 1,
      // "name": "Dragon",
      // "isPrefix": true,
      // "isSuffix": false,
      // "isTitle": false,
      // "description": "Reduces Damage Significantly",
      // "types": [
      //   3
      // ],
      // "rarities": [
      //   6,
      //   5
      // ]
      this.cache.ItemAffix[item.name] = await this.model.ItemAffix.findOne({ name: item.name })
      this.oldCache.ItemAffix[item.id] = this.cache.ItemAffix[item.name]

      if (this.cache.ItemAffix[item.id]) {
        console.log('Item affix ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemAffix[item.name] = await this.model.ItemAffix.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: 'Active',
        isPrefix: item.isPrefix,
        isSuffix: item.isSuffix,
        isTitle: item.isTitle,
        weight: 1,
        typeIds: item.types.map((typeId) => this.cache.ItemType[typeId].id),
        rarityIds: item.rarities.map((rarityId) => this.cache.ItemRarity[rarityId].id),
      })

      this.oldCache.ItemAffix[item.id] = this.cache.ItemAffix[item.name]
    }
  }

  async migrateItemTypes() {
    for (const item of itemTypes) {
      if (!item.name) continue

      this.cache.ItemType[item.name] = await this.model.ItemType.findOne({ name: item.name })
      this.oldCache.ItemType[item.id] = this.cache.ItemType[item.name]

      if (this.cache.ItemType[item.id]) {
        console.log('Item type ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemType[item.name] = await this.model.ItemType.create({
        applicationId: this.cache.Application.Arken.id,
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

      if (this.cache.ItemSlot[item.id]) {
        console.log('Item slot ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSlot[item.name] = await this.model.ItemSlot.create({
        applicationId: this.cache.Application.Arken.id,
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

      if (this.cache.ItemSubType[item.id]) {
        console.log('Item subtype ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemSubType[item.name] = await this.model.ItemSubType.create({
        applicationId: this.cache.Application.Arken.id,
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

      this.cache.ItemMaterial[item.id] = this.cache.ItemMaterial[item.name] =
        await this.model.ItemMaterial.findOne({
          name: item.name,
        })

      if (this.cache.ItemMaterial[item.id]) {
        console.log('Item material ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemMaterial[item.id] = this.cache.ItemMaterial[item.name] =
        await this.model.ItemMaterial.create({
          applicationId: this.cache.Application.Arken.id,
          name: item.name,
          description: '',
          key: item.name,
          meta: item,
          status: 'Active',
          // TODO: recipes/areas
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
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        status: 'Active',
      })
    }
  }

  async migrateItemRanks() {
    const itemRanks = [
      {
        value: 0,
        name: 'F',
      },
      {
        value: 40,
        name: 'D',
      },
      {
        value: 50,
        name: 'C',
      },
      {
        value: 60,
        name: 'B',
      },
      {
        value: 70,
        name: 'A',
      },
      {
        value: 80,
        name: 'S',
      },
      {
        value: 90,
        name: 'SS',
      },
      {
        value: 100,
        name: 'SSS',
      },
    ]

    for (const item of itemRanks) {
      if (!item.name) continue

      this.cache.ItemRank[item.name] = await this.model.ItemRank.findOne({ name: item.name })
      if (this.cache.ItemRank[item.name]) {
        console.log('Item rank ' + item.name + ' already exists')
        continue
      }

      this.cache.ItemRank[item.name] = await this.model.ItemRank.create({
        applicationId: this.cache.Application.Arken.id,
        name: item.name,
        description: '',
        key: item.name,
        meta: item,
        value: item.value,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
  // applicationId: this.cache.Application.Arken.id,
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
        reward: '50 ZENO',
        status: 'Active', // 'Ready to be accepted, ask in Telegram.'
        claimedBy: 'Nobody yet.',
        description:
          "We would like our status, accomplishments and games documented on wikipedia. It should be done in a professional manner. In particular, we'd like our world first's documented, like being the first interoperable game model to utilize the same NFTs across games.",
      },
      {
        name: 'List Evolution Isles on various game listing sites',
        reward: '50 ZENO',
        status: 'Paused', // 'Paused. Wait for Evo 2 and free account system.',
        claimedBy: 'Nobody yet.',
        description:
          'We would like Evolution Isles listed across as many gaming sites as possible. A minimum of 20 high-quality sites would be best.',
      },
      {
        name: 'Categorize AI generated items into mythic/epic/rare/magical',
        reward: '2 ZENO per item',
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
        applicationId: this.cache.Application.Arken.id,
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
        applicationId: this.cache.Application.Arken.id,
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
    this.usernameToProfileId[username] = (await this.model.Profile.findOne({ name: username })).id
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 5 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 1 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 20 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 1 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 1 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 20 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 5 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 2 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 3 },
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
              { ownerId: await this.findProfileIdByUsername('Hashwarp'), amount: 5 },
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
    console.log('Creating Reality')

    this.cache.Omniverse.Reality = await this.model.Omniverse.findOne({ name: 'Reality' }).exec()

    if (!this.cache.Omniverse.Reality)
      this.cache.Omniverse.Reality = await this.model.Omniverse.create({
        name: 'Reality',
        key: 'reality',
      })

    this.cache.Metaverse.Reality = await this.model.Metaverse.findOne({ key: 'reality' }).exec()

    if (!this.cache.Metaverse.Reality)
      this.cache.Metaverse.Reality = await this.model.Metaverse.create({
        omniverseId: this.cache.Omniverse.Reality.id,
        name: 'Reality',
        key: 'reality',
      })

    this.cache.Application.Reality = await this.model.Application.findOne({
      key: 'reality',
    }).exec()

    if (!this.cache.Application.Reality)
      this.cache.Application.Reality = await this.model.Application.create({
        omniverseId: this.cache.Omniverse.Reality.id,
        name: 'Reality',
        key: 'reality',
      })

    console.log('Reality: Creating universes', this.cache.Application.Reality.id)

    this.cache.Universe.Universe = await this.model.Universe.findOne({ key: 'universe' }).exec()

    if (!this.cache.Universe.Universe)
      this.cache.Universe.Universe = await this.model.Universe.create({
        applicationId: this.cache.Application.Reality.id,
        name: 'Universe',
        key: 'universe',
      })

    console.log('Reality: Creating galaxies')

    this.cache.Galaxy.MilkyWay = await this.model.Galaxy.findOne({ key: 'milky-way' }).exec()

    if (!this.cache.Galaxy.MilkyWay)
      this.cache.Galaxy.MilkyWay = await this.model.Galaxy.create({
        applicationId: this.cache.Application.Reality.id,
        universe: this.cache.Universe.Universe.id,
        name: 'Milky Way',
        key: 'milky-way',
      })

    console.log('Reality: Creating solar systems')

    this.cache.SolarSystem.SolarSystem = await this.model.SolarSystem.findOne({
      key: 'solar-system',
    }).exec()

    if (!this.cache.SolarSystem.SolarSystem)
      this.cache.SolarSystem.SolarSystem = await this.model.SolarSystem.create({
        applicationId: this.cache.Application.Reality.id,
        galaxyId: this.cache.Galaxy.MilkyWay.id,
        name: 'Solar System',
        key: 'solar-system',
      })

    console.log('Reality: Creating planets')

    this.cache.Planet.Earth = await this.model.Planet.findOne({ key: 'earth' }).exec()

    if (!this.cache.Planet.Earth)
      this.cache.Planet.Earth = await this.model.Planet.create({
        applicationId: this.cache.Application.Reality.id,
        solarSystemId: this.cache.SolarSystem.SolarSystem.id,
        name: 'Earth',
        key: 'earth',
      })

    this.cache.Planet.Mars = await this.model.Planet.findOne({ key: 'mars' }).exec()

    if (!this.cache.Planet.Mars)
      this.cache.Planet.Mars = await this.model.Planet.create({
        applicationId: this.cache.Application.Reality.id,
        solarSystemId: this.cache.SolarSystem.SolarSystem.id,
        name: 'Mars',
        key: 'mars',
      })

    console.log('Creating Arken Realms')

    this.cache.Omniverse.Arken = await this.model.Omniverse.findOne({ name: 'Arken' }).exec()

    if (!this.cache.Omniverse.Arken)
      this.cache.Omniverse.Arken = await this.model.Omniverse.create({
        name: 'Arken',
        key: 'arken',
      })

    this.cache.Metaverse.Arken = await this.model.Metaverse.findOne({ key: 'arken' }).exec()

    if (!this.cache.Metaverse.Arken)
      this.cache.Metaverse.Arken = await this.model.Metaverse.create({
        omniverseId: this.cache.Omniverse.Arken.id,
        name: 'Arken Realms',
        key: 'arken',
      })

    this.cache.Application.Arken = await this.model.Application.findOne({
      key: 'arken',
    }).exec()

    if (!this.cache.Application.Arken)
      this.cache.Application.Arken = await this.model.Application.create({
        omniverseId: this.cache.Omniverse.Arken.id,
        name: 'Arken Realms',
        key: 'arken',
      })

    this.application = this.cache.Application.Arken
    this.filters.applicationId = this.application.id

    console.log('Creating: Cerebro')

    this.cache.Application.Cerebro = await this.model.Application.findOne({
      key: 'cerebro',
    }).exec()

    if (!this.cache.Application.Cerebro)
      this.cache.Application.Cerebro = await this.model.Application.create({
        omniverseId: this.cache.Omniverse.Arken.id,
        name: 'Cerebro',
        key: 'cerebro',
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

    this.cache.Role.Guest = await this.model.Role.findOne({ name: 'Guest' }).exec()

    if (!this.cache.Role.Guest)
      this.cache.Role.Guest = await this.model.Role.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Guest',
      })

    this.cache.Role.User = await this.model.Role.findOne({ name: 'User' }).exec()

    if (!this.cache.Role.User)
      this.cache.Role.User = await this.model.Role.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'User',
      })

    this.cache.Role.Developer = await this.model.Role.findOne({ name: 'Developer' }).exec()

    if (!this.cache.Role.Developer)
      this.cache.Role.Developer = await this.model.Role.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Developer',
      })

    console.log('Creating accounts')

    // mongo.Account.dropIndex('applicationId_1_organizationId_1_username_1')

    this.cache.Account.Hashwarp = await this.model.Account.findOne({
      applicationId: this.cache.Application.Arken.id,
      username: 'Hashwarp',
    }).exec()

    if (!this.cache.Account.Hashwarp)
      this.cache.Account.Hashwarp = await this.model.Account.create({
        applicationId: this.cache.Application.Arken.id,
        username: 'Hashwarp',
      })

    console.log('Creating profiles')

    this.cache.Profile.Hashwarp = await this.getProfileByName('Hashwarp')

    if (!this.cache.Profile.Hashwarp)
      this.cache.Profile.Hashwarp = await this.model.Profile.create({
        applicationId: this.cache.Application.Arken.id,
        accountId: this.cache.Account.Hashwarp.id,
        name: 'Hashwarp',
      })

    console.log('Creating chains')

    this.cache.Chain.ETH = await this.model.Chain.findOne({ name: 'Ethereum' }).exec()

    if (!this.cache.Chain.ETH)
      this.cache.Chain.ETH = await this.model.Chain.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Ethereum',
        key: 'ethereum',
      })

    this.cache.Chain.TON = await this.model.Chain.findOne({ name: 'TON' }).exec()

    if (!this.cache.Chain.TON)
      this.cache.Chain.TON = await this.model.Chain.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'TON',
        key: 'ton',
      })

    this.cache.Chain.MATIC = await this.model.Chain.findOne({ name: 'Polygon' }).exec()

    if (!this.cache.Chain.MATIC)
      this.cache.Chain.MATIC = await this.model.Chain.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Polygon',
        key: 'polygon',
      })

    this.cache.Chain.BSC = await this.model.Chain.findOne({ name: 'BSC' }).exec()

    if (!this.cache.Chain.BSC)
      this.cache.Chain.BSC = await this.model.Chain.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'BSC',
        key: 'bsc',
      })

    this.cache.Chain.IMX = await this.model.Chain.findOne({ name: 'Immutable X' }).exec()

    if (!this.cache.Chain.IMX)
      this.cache.Chain.IMX = await this.model.Chain.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Immutable X',
        key: 'immutablex',
      })

    console.log('Creating: Infinite Arena')

    // this.cache.Application['Infinite Arena'] = await this.model.Application.findOne({
    //   name: 'Infinite Arena',
    // }).exec()

    // if (!this.cache.Application['Infinite Arena'])
    //   this.cache.Application['Infinite Arena'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Infinite Arena',
    //     key: 'infinite-arena',
    //   })

    this.cache.Product['Infinite Arena'] = await this.model.Product.findOne({
      name: 'Infinite Arena',
    }).exec()

    if (!this.cache.Product['Infinite Arena'])
      this.cache.Product['Infinite Arena'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Infinite Arena',
        key: 'infinite-arena',
      })

    this.cache.Game['Infinite Arena'] = await this.model.Game.findOne({
      name: 'Infinite Arena',
    }).exec()

    if (!this.cache.Game['Infinite Arena'])
      this.cache.Game['Infinite Arena'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Infinite Arena'].id,
        name: 'Infinite Arena',
        key: 'infinite-arena',
      })

    console.log('Creating: Evolution Isles')

    // this.cache.Application['Evolution Isles'] = await this.model.Application.findOne({
    //   name: 'Evolution Isles',
    // }).exec()

    // if (!this.cache.Application['Evolution Isles'])
    //   this.cache.Application['Evolution Isles'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Evolution Isles',
    //     key: 'evolution-isles',
    //   })

    this.cache.Product['Evolution Isles'] = await this.model.Product.findOne({
      name: 'Evolution Isles',
    }).exec()

    if (!this.cache.Product['Evolution Isles'])
      this.cache.Product['Evolution Isles'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Evolution Isles',
        key: 'evolution-isles',
      })

    this.cache.Game['Evolution Isles'] = await this.model.Game.findOne({
      name: 'Evolution Isles',
    }).exec()

    if (!this.cache.Game['Evolution Isles'])
      this.cache.Game['Evolution Isles'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Evolution Isles'].id,
        name: 'Evolution Isles',
        key: 'evolution-isles',
      })

    console.log('Creating: Heart of the Oasis')

    // this.cache.Application['Heart of the Oasis'] = await this.model.Application.findOne({
    //   name: 'Heart of the Oasis',
    // }).exec()

    // if (!this.cache.Application['Heart of the Oasis'])
    //   this.cache.Application['Heart of the Oasis'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Heart of the Oasis',
    //     key: 'heart-of-the-oasis',
    //   })

    this.cache.Product['Heart of the Oasis'] = await this.model.Product.findOne({
      name: 'Heart of the Oasis',
    }).exec()

    if (!this.cache.Product['Heart of the Oasis'])
      this.cache.Product['Heart of the Oasis'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Heart of the Oasis',
        key: 'heart-of-the-oasis',
      })

    this.cache.Game['Heart of the Oasis'] = await this.model.Game.findOne({
      name: 'Heart of the Oasis',
    })

    if (!this.cache.Game['Heart of the Oasis'])
      this.cache.Game['Heart of the Oasis'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Heart of the Oasis'].id,
        name: 'Heart of the Oasis',
        key: 'heart-of-the-oasis',
      })

    console.log('Creating: Runic Raids')

    // this.cache.Application['Runic Raids'] = await this.model.Application.findOne({
    //   name: 'Runic Raids',
    // }).exec()

    // if (!this.cache.Application['Runic Raids'])
    //   this.cache.Application['Runic Raids'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Runic Raids',
    //     key: 'runic-raids',
    //   })

    this.cache.Product['Runic Raids'] = await this.model.Product.findOne({
      name: 'Runic Raids',
    }).exec()

    if (!this.cache.Product['Runic Raids'])
      this.cache.Product['Runic Raids'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Runic Raids',
        key: 'runic-raids',
      })

    this.cache.Game['Runic Raids'] = await this.model.Game.findOne({
      name: 'Runic Raids',
    }).exec()

    if (!this.cache.Game['Runic Raids'])
      this.cache.Game['Runic Raids'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Runic Raids'].id,
        name: 'Runic Raids',
        key: 'runic-raids',
      })

    console.log('Creating: Strike Legends')

    // this.cache.Application['Strike Legends'] = await this.model.Application.findOne({
    //   name: 'Strike Legends',
    // }).exec()

    // if (!this.cache.Application['Strike Legends'])
    //   this.cache.Application['Strike Legends'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Strike Legends',
    //     key: 'strike-legends',
    //   })

    this.cache.Product['Strike Legends'] = await this.model.Product.findOne({
      name: 'Strike Legends',
    }).exec()

    if (!this.cache.Product['Strike Legends'])
      this.cache.Product['Strike Legends'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Strike Legends',
        key: 'strike-legends',
      })

    this.cache.Game['Strike Legends'] = await this.model.Game.findOne({
      name: 'Strike Legends',
    }).exec()

    if (!this.cache.Game['Strike Legends'])
      this.cache.Game['Strike Legends'] = await this.model.Game.create({
        productId: this.cache.Product['Strike Legends'].id,
        applicationId: this.cache.Application.Arken.id,
        name: 'Strike Legends',
        key: 'strike-legends',
      })

    console.log('Creating: Guardians Unleashed')

    // this.cache.Application['Guardians Unleashed'] = await this.model.Application.findOne({
    //   name: 'Guardians Unleashed',
    // }).exec()

    // if (!this.cache.Application['Guardians Unleashed'])
    //   this.cache.Application['Guardians Unleashed'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Guardians Unleashed',
    //     key: 'guardians-unleashed',
    //   })

    this.cache.Product['Guardians Unleashed'] = await this.model.Product.findOne({
      name: 'Guardians Unleashed',
    }).exec()

    if (!this.cache.Product['Guardians Unleashed'])
      this.cache.Product['Guardians Unleashed'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Guardians Unleashed',
        key: 'guardians-unleashed',
      })

    this.cache.Game['Guardians Unleashed'] = await this.model.Game.findOne({
      name: 'Guardians Unleashed',
    }).exec()

    if (!this.cache.Game['Guardians Unleashed'])
      this.cache.Game['Guardians Unleashed'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Guardians Unleashed'].id,
        name: 'Guardians Unleashed',
        key: 'guardians-unleashed',
      })

    console.log('Creating: Meme Isles')

    // this.cache.Application['Meme Isles'] = await this.model.Application.findOne({
    //   name: 'Meme Isles',
    // }).exec()

    // if (!this.cache.Application['Meme Isles'])
    //   this.cache.Application['Meme Isles'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Meme Isles',
    //     key: 'meme-isles',
    //   })

    this.cache.Product['Meme Isles'] = await this.model.Product.findOne({
      name: 'Meme Isles',
    }).exec()

    if (!this.cache.Product['Meme Isles'])
      this.cache.Product['Meme Isles'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Meme Isles',
        key: 'meme-isles',
      })

    this.cache.Game['Meme Isles'] = await this.model.Game.findOne({
      name: 'Meme Isles',
    }).exec()

    if (!this.cache.Game['Meme Isles'])
      this.cache.Game['Meme Isles'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Meme Isles'].id,
        name: 'Meme Isles',
        key: 'meme-isles',
      })

    console.log('Creating: Return to the Oasis')

    // this.cache.Application['Return to the Oasis'] = await this.model.Application.findOne({
    //   name: 'Return to the Oasis',
    // }).exec()

    // if (!this.cache.Application['Return to the Oasis'])
    //   this.cache.Application['Return to the Oasis'] = await this.model.Application.create({
    //     omniverseId: this.cache.Omniverse.Arken.id,
    //     name: 'Return to the Oasis',
    //     key: 'return-to-the-oasis',
    //   })

    this.cache.Product['Return to the Oasis'] = await this.model.Product.findOne({
      name: 'Return to the Oasis',
    }).exec()

    if (!this.cache.Product['Return to the Oasis'])
      this.cache.Product['Return to the Oasis'] = await this.model.Product.create({
        applicationId: this.cache.Application.Arken.id,
        name: 'Return to the Oasis',
        key: 'return-to-the-oasis',
      })

    this.cache.Game['Return to the Oasis'] = await this.model.Game.findOne({
      name: 'Return to the Oasis',
    }).exec()

    if (!this.cache.Game['Return to the Oasis'])
      this.cache.Game['Return to the Oasis'] = await this.model.Game.create({
        applicationId: this.cache.Application.Arken.id,
        productId: this.cache.Product['Return to the Oasis'].id,
        name: 'Return to the Oasis',
        key: 'return-to-the-oasis',
      })
  }

  async getChristmasTicketWhales() {
    console.log('Getting tickets')

    const tickets = await this.model.Item.aggregate([
      { $match: { name: 'Santa Christmas 2021 Ticket' } },
      { $sort: { quantity: -1 } },
      { $limit: 15 },
      {
        $lookup: {
          from: 'Character',
          localField: 'characterId',
          foreignField: '_id',
          as: 'character',
        },
      },
      { $unwind: '$character' },
      {
        $lookup: {
          from: 'Profile',
          localField: 'character.profileId',
          foreignField: '_id',
          as: 'character.profile',
        },
      },
      { $unwind: '$character.profile' },
    ])

    // console.log(tickets)

    for (const ticket of tickets) {
      // console.log(ticket.character)
      if (!ticket.character?.profile) continue
      console.log(
        ticket.character.profile.meta.username || ticket.character.profile.name,
        ticket.quantity
      )
    }
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

    this.model = {}
    this.cache = {}
    this.oldCache = {}

    for (const service of [
      Area,
      Asset,
      Chain,
      Character,
      Chat,
      Collection,
      Core,
      Game,
      Interface,
      Item,
      Job,
      Market,
      Product,
      Profile,
      Raffle,
      Skill,
      Video,
    ]) {
      for (const modelName of Object.keys(service.Models)) {
        const model = service.Models[modelName]

        this.cache[model.collection.name] = {}
        this.model[model.collection.name] = model
        this.oldCache[model.collection.name] = {}
      }
    }

    // await this.getChristmasTicketWhales()
    await this.createOmniverse() //
    await this.migrateStats()
    await this.migrateEras()
    await this.migrateGuides() //

    // await this.migrateItemTransmuteRules() // fill this in and do later
    await this.migrateSkills() //
    await this.migrateSkillMods() //
    await this.migrateSkillClassifications() //
    await this.migrateSkillConditions() //
    // // await this.migrateSkillConditionParams() // dont need??
    await this.migrateSkillStatusEffects() //
    await this.migrateSkillTrees() // fill in and do again later
    await this.migrateSkillTreeNodes()
    // // await this.migrateCharacterGuilds()
    await this.migrateCharacterRaces()
    await this.migrateCharacterGenders()
    await this.migrateCharacterFactions()
    await this.migrateCharacterClasses()
    await this.migrateCharacterTypes()
    await this.migrateCharacterAttributes()
    // // await this.migrateCharacterStats() // merged into attributes
    await this.migrateCharacterTitles()
    // // await this.migrateCharacterSpawnRules() // unused
    // // await this.migrateCharacterFightingStyles() // unused
    await this.migrateCharacterNameChoices()
    // // await this.migrateCharacterMovementStasuses() // unused
    // // await this.migrateCharacterPersonalities() // unused
    await this.migrateAreas() //
    await this.migrateAreaTypes()
    await this.migrateAreaNameChoices()
    await this.migrateEnergies()
    await this.migrateLore()
    // // await this.migrateHistoricalRecords() // none
    // // await this.migrateAreaLandmark()
    await this.migrateAchievements()
    await this.migrateBiomeFeatures()
    await this.migrateBiomes() // needs to be rerun
    await this.migrateSolarSystems()
    await this.migratePlanets()

    await this.migrateAssetStandards() //
    await this.migrateAssets() //
    await this.migrateItemAttributes() //
    await this.migrateItemRecipes() //
    await this.migrateItemMaterials() //
    // await this.migrateItemAttributeParams() // forget about this?
    // await this.migrateItemParams() // forget about this?
    await this.migrateItemSpecificTypes() //
    await this.migrateItemSubTypes() //
    await this.migrateItemTypes() //
    await this.migrateItemAffixes()
    await this.migrateItemSlots() //
    await this.migrateItemRarities() //
    await this.migrateItemRanks() //
    await this.migrateItemSets() //

    await this.migrateCharacters()
    await this.migrateActs()
    // await this.migrateTeams()
    // // await this.migrateAccounts()
    await this.migrateProfiles()
    // // await this.migrateClaims()
    // // // await this.migrateGameItems()
    // await this.migrateOldTrades()
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

export default function init() {
  const app = new App()

  app.init().catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
}
