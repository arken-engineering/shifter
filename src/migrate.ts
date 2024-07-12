// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import jetpack from 'fs-jetpack'
import path from 'path'
import { log, isDebug } from '@arken/web-sdk/util'
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
// import { decodeItem } from 'rune-backend-sdk/src/util/item-decoder'
import areaNameChoices from 'rune-backend-sdk/src/data/generated/areaNameChoices.json'
import skills from 'rune-backend-sdk/src/data/generated/skills.json'
import skillMods from 'rune-backend-sdk/src/data/generated/skillMods.json'
import skillClassifications from 'rune-backend-sdk/src/data/generated/skillClassifications.json'
import skillConditions from 'rune-backend-sdk/src/data/generated/skillConditions.json'
import skillStatusEffects from 'rune-backend-sdk/src/data/generated/skillStatusEffects.json'
import skillTreeNodes from 'rune-backend-sdk/src/data/generated/skillTreeNodes.json'
import characterNameChoices from 'rune-backend-sdk/src/data/generated/characterNameChoices.json'
import characterTitles from 'rune-backend-sdk/src/data/generated/characterTitles.json'
import characterTypes from 'rune-backend-sdk/src/data/generated/characterTypes.json'
import characterAttributes from 'rune-backend-sdk/src/data/generated/characterAttributes.json'
import itemSets from 'rune-backend-sdk/src/data/generated/itemSets.json'
import itemAttributes from 'rune-backend-sdk/src/data/generated/itemAttributes.json'
import itemAttributeParams from 'rune-backend-sdk/src/data/generated/itemAttributeParams.json'
import itemRecipes from 'rune-backend-sdk/src/data/generated/itemRecipes.json'
import itemRarities from 'rune-backend-sdk/src/data/generated/itemRarities.json'
import itemMaterials from 'rune-backend-sdk/src/data/generated/itemMaterials.json'
import itemSubTypes from 'rune-backend-sdk/src/data/generated/itemSubTypes.json'
import itemSpecificTypes from 'rune-backend-sdk/src/data/generated/itemSpecificTypes.json'
import itemSlots from 'rune-backend-sdk/src/data/generated/itemSlots.json'
import itemTypes from 'rune-backend-sdk/src/data/generated/itemTypes.json'
import gameInfo from 'rune-backend-sdk/src/data/generated/gameInfos.json'
import characterClasses from 'rune-backend-sdk/src/data/generated/characterClasses.json'
import characterFactions from 'rune-backend-sdk/src/data/generated/characterFactions.json'
import characterRaces from 'rune-backend-sdk/src/data/generated/characterRaces.json'
import lore from 'rune-backend-sdk/src/data/generated/lores.json'
import biomes from 'rune-backend-sdk/src/data/generated/biomes.json'
import biomeFeatures from 'rune-backend-sdk/src/data/generated/biomeFeatures.json'
import acts from 'rune-backend-sdk/src/data/generated/acts.json'
// import areaTypes from 'rune-backend-sdk/src/data/generated/areaTypes.json'
import areas from 'rune-backend-sdk/src/data/generated/areas.json'
import eras from 'rune-backend-sdk/src/data/generated/eras.json'
import timeGates from 'rune-backend-sdk/src/data/generated/timeGates.json'
import runeItems from 'rune-backend-sdk/src/data/items'
import energies from 'rune-backend-sdk/src/data/generated/energies.json'
import npcs from 'rune-backend-sdk/src/data/generated/npcs.json'
import planets from 'rune-backend-sdk/src/data/generated/planets.json'
import solarSystems from 'rune-backend-sdk/src/data/generated/solarSystems.json'
import games from 'rune-backend-sdk/src/data/generated/games.json'
import achievements from '../../data/achievements.json'
import * as schemas from './schema'
import Mongoose, { ConnectOptions, InferSchemaType } from 'mongoose'

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
          return new Proxy(
            target[key],
            createHander<any>([...path, key as string])
          )
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

function guid() {
  return uuidv4().toUpperCase()
}

const defaultOwnerId = ''

const oldPrisma = new OldPrismaClient({
  datasources: {
    db: {
      url: 'postgresql://dev:@localhost:5432/public?user=dev',
    },
  },
})

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://dev:@localhost:5432/rune?user=dev',
    },
  },
})

const map: any = {
  Organization: {},
  Account: {},
  Profile: {},
  Role: {},
  Omniverse: {},
  Metaverse: {},
  Application: {},
  Chain: {},
  Product: {},
  Game: {},
}

const gameNumberToGameId = {
  1: map.Game['Runic Raids'],
  2: map.Game['Evolution Isles'],
  3: map.Game['Infinite Arena'],
  4: map.Game['Guardians Unleashed'],
  5: map.Game['Heart of the Oasis'],
}

async function migrateAccounts() {
  const accounts = await prisma.account.findMany()
  console.log(`Number of accounts to migrate: ${accounts.length}`)

  for (const account of accounts) {
    // Check if the account already exists in MongoDB
    const existingAccount = await mongo.Account.findOne({ key: account.key })

    if (existingAccount) {
      console.log(`Account with key ${account.key} already exists.`)
      map.Account[existingAccount.id] = existingAccount
      continue
    }

    // Insert the account into MongoDB
    const newAccount = await mongo.Account.create({
      name: account.name,
      key: account.key,
      value: account.value,
      meta: account.meta,
      status: account.status,
      createdAt: account.createdAt,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      address: account.address,
      avatar: account.avatar,
      password: account.password,
    })

    map.Account[account.id] = newAccount

    console.log(`Inserted account with ID: ${newAccount._id}`)
  }

  console.log('Migration completed.')
}

// async function migrateAccounts() {
//   await oldPrisma.$connect()

//   const oldAccounts = await oldPrisma.account.findMany()
//   console.log(oldAccounts.length)
//   //   process.exit();
//   for (const oldAccount of oldAccounts) {
//     // delete oldAccount.id;
//

//     map.Account[oldAccount.id] = newId

//     const newAccount = await prisma.account.create({
//       data: {
//
//         name: oldAccount.name,
//         key: oldAccount.key,
//         value: oldAccount.value,
//         meta: oldAccount.meta,
//         status: oldAccount.status,
//         createdAt: oldAccount.createdAt,
//         email: oldAccount.email,
//         firstName: oldAccount.firstName,
//         lastName: oldAccount.lastName,
//         address: oldAccount.address,
//         avatar: oldAccount.avatar,
//         password: oldAccount.password,
//       },
//     })

//     console.log(newAccount.id)
//   }

//   const oldProfiles = await oldPrisma.profile.findMany()
//   console.log(oldProfiles.length)

//   for (const oldProfile of oldProfiles) {
//      as string

//     const newProfile = await prisma.profile.create({
//       data: {
//         applicationId: map.Application.Rune,
//
//         name: oldProfile.name,
//         key: oldProfile.key,
//         value: oldProfile.value,
//         meta: oldProfile.meta,
//         status: oldProfile.status,
//         createdAt: oldProfile.createdAt,
//         updatedAt: oldProfile.updatedAt,
//         address: oldProfile.address,
//         role: oldProfile.role,
//         accountId: map.Account[oldProfile.accountId],
//         chainId: map.Chain['BSC'],
//       },
//     })

//     console.log(newProfile.id)

//     // const newCharacter = await prisma.character.create({
//     //   data: {
//     //     id: guid(),
//     //     name: oldProfile.name,
//     //     key: oldProfile.key,
//     //     meta: oldProfile.meta,
//     //     status: 'Active',
//     //     createdAt: oldProfile.createdAt,
//     //     updatedAt: oldProfile.updatedAt,
//     //     ownerId: newId as never,
//     //   },
//     // })

//     // const achievements = jetpack.read(path.resolve(`../../../users/${newProfile.address}/achievements.json`), 'json')
//     // const characters = jetpack.read(path.resolve(`../../../users/${newProfile.address}/characters.json`), 'json')
//     // const evolution = jetpack.read(path.resolve(`../../../users/${newProfile.address}/evolution.json`), 'json')
//     // const inventory = jetpack.read(path.resolve(`../../../users/${newProfile.address}/inventory.json`), 'json')
//     // const market = jetpack.read(path.resolve(`../../../users/${newProfile.address}/market.json`), 'json')
//     // const overview = jetpack.read(path.resolve(`../../../users/${newProfile.address}/overview.json`), 'json')
//   }
// }

async function migrateClaims() {
  // @ts-ignore
  for (const claimRequest of claimRequests) {
    if (!claimRequest) continue

    const profile = await prisma.profile.findFirst({
      where: { address: { equals: claimRequest.address } },
    })

    if (!profile) {
      console.log('Profile not found', claimRequest.username, claimRequest.address)
      continue
    }

    await prisma.payment.create({
      data: {
        applicationId: map.Application.Arken.id,
        name: claimRequest.username,
        value: claimRequest.address,
        key: claimRequest.id,
        meta: claimRequest,
        status: claimRequest.status,
        ownerId: profile.id,
        createdAt: new Date(claimRequest.createdAt),
      },
    })

    // console.log(claimRequest.id)
  }

  console.log('Done')
}

async function migrateReferrals() {
  // @ts-ignore
  for (const referral of referrals) {
    const sender = await prisma.profile.findFirst({
      where: { name: { equals: referral.referrer } },
    })

    const recipient = await prisma.profile.findFirst({
      where: { address: { equals: referral.address } },
    })

    await prisma.referral.create({
      data: {
        recipientId: recipient.id as never,
        senderId: sender.id as never,
        meta: referral,
        status: referral.status,
        createdAt: new Date(referral.createdAt),
      },
    })

    console.log(referral.id)
  }
}

async function migrateAssets() {
  const items = jetpack.read(path.resolve(`../data/items.json`), 'json')

  // @ts-ignore
  for (const item of items) {
    if (!item.id) continue

    const asset = await mongo.Asset.create({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    })

    console.log(asset.id)
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
  // const profiles = await prisma.profile.findMany()
  // for (const profile of profiles) {
  //   // @ts-ignore
  //   const trades = profile.meta?.market.trades
  //   if (!trades || !Array.isArray(trades) || trades.length === 0) continue
  //   console.log(trades)
  //   return
  // }
  // for (const trade of oldTrades) {
  //
  //   trade.version = 1
  //   const buyer =
  //     trade.buyer !== '0x0000000000000000000000000000000000000000'
  //       ? await prisma.profile.findFirst({
  //           where: { address: { equals: trade.buyer } },
  //         })
  //       : null
  //   const owner = await prisma.profile.findFirst({
  //     where: { address: { equals: trade.owner } },
  //   })
  //   cant find user? look in filesystem
  //   const item = decodeItem(trade.tokenId)
  //   const asset = find asset by trade.item.id + ''
  //   const trade = await prisma.trade.create({
  //     data: {
  //       applicationId: map.Application.Arken.id,
  //
  //       name: trade.name,
  //       value: trade.address,
  //       ownerId: owner.id,
  //       buyerId: buyer?.id,
  //       key: trade.id + '',
  //       meta: trade,
  //       status: trade.status,
  //
  //       itemsOnTrade: {
  //         createOrConnect: {
  //           [
  //             {
  //               item: {
  //                 createOrConnect: {
  //                   applicationId: map.Application.Arken.id,
  //                   key: trade.item.id + ''
  //                   assetId: asset.id
  //                   meta: item
  //                   chain: 'bsc'
  //                 }
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     },
  //   })
  // }
}

async function migrateTeams() {
  {
    const overview = guild1OverviewData

    // "memberCount": 54,
    // "activeMemberCount": 37,
    // "points": 1267,
    // "name": "The First Ones",
    // "description": "Formed after the discovery of a cache of hidden texts in an abandoned, secret Horadric meeting place. This group of scholars was brought together by Bin Zy.",
    // "icon": "https://rune.farm/images/teams/the-first-ones.png",
    // "backgroundColor": "#fff",
    // "discord": { "role": "862170863827025950", "channel": "862153263804448769" },
    await prisma.gameTeam.create({
      data: {
        metaverseId: map.Metaverse.Arken.id,
        name: overview.name,
        description: overview.description,
        key: overview.name,
        meta: overview,
        status: 'Active',
      },
    })

    // {
    //   "address": "0xa94210Bce97C665aCd1474B6fC4e9817a456EECd",
    //   "username": "kucka",
    //   "points": 1,
    //   "achievementCount": 1,
    //   "isActive": true,
    //   "characterId": 6
    // },
    for (const member of overview.memberDetails) {
      const profile = prisma.profile.findFirst({ where: { address: { equals: member.address } } })
    }

    // use profiles to generate characters
    // character belongs to profile and metaverse
    // metaverse has a parent metaverse (visualize)
    // team uses character
    // metaverse acn have list of products (games)
    //
  }
}

async function migrateAchievements() {
  const metaverse = await mongo.Metaverse.find({
    name: 'Arken',
  })

  const achievements = await prisma.achievement.findMany({
    where: { metaverseId: metaverse.id },
  })

  for (const item of achievements) {
    // if (item.icon) item.icon = item.icon.replace('undefined', '');

    // Check if the achievement already exists in MongoDB
    const existingAchievement = await mongo.Achievement.findOne({ key: item.key })

    if (existingAchievement) {
      console.log(`Achievement with key ${item.key} already exists.`)
      continue
    }

    // Insert the achievement into MongoDB
    await mongo.Achievement.create({
      applicationId: map.Application.Arken.id.id,
      metaverseId: metaverse.id,
      name: item.name,
      description: '',
      key: item.key,
      meta: item,
      status: item.status,
    })

    console.log(`Inserted achievement with ID: ${newId}`)
  }

  console.log('Migration completed.')
}

// async function migrateAchievements() {
//   // {"market": {"trades": []}, "points": 1, "address": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "guildId": 2, "premium": {"locked": 0, "features": [], "unlocked": 0}, "rewards": {"items": [], "runes": {}}, "daoVotes": [], "holdings": {}, "username": "Harry", "evolution": {}, "inventory": {"items": [{"id": 1, "from": "0x6Bf051ce847A0EBBc10fA22884C01D550BD40269", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 8, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 8, "variant": 1, "attributeId": 1}, {"value": 2, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 1}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Magical", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001100810021001111111", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649762142003, "isRetired": true, "shorthand": "8-2", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 8, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 2, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.44, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110081002100111...111", "isUnequipable": false, "isTransferable": true}, {"id": 1, "from": "0x85C07b6a475Ee19218D0ef9C278C7e58715Af842", "icon": "undefinedimages/items/00001.png", "meta": {"harvestBurn": 0, "harvestFees": {}, "harvestYield": 14, "chanceToLoseHarvest": 0, "chanceToSendHarvestToHiddenPool": 0}, "mods": [{"value": 14, "variant": 1, "attributeId": 1}, {"value": 1, "variant": 1, "attributeId": 2}, {"value": 1, "variant": 1, "attributeId": 3}, {"value": 111, "variant": 1}, {"value": 1, "variant": 0}], "name": "Steel", "type": 0, "isNew": false, "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "slots": [1, 2], "value": "0", "rarity": "Rare", "recipe": {"requirement": [{"id": 3, "quantity": 1}, {"id": 1, "quantity": 1}]}, "slotId": 1, "status": "transferred_out", "details": {"Date": "April 20, 2021 - June 4, 2021", "Type": "Sword", "Subtype": "Night Blade", "Rune Word": "Tir El", "Max Supply": "Unknown", "Distribution": "Crafted"}, "hotness": 6, "tokenId": "100100001101410011001111101", "version": 1, "branches": {"1": {"attributes": [{"id": 1, "max": 15, "min": 5, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "perfection": [15, 0], "description": ["Made by Men, this blade is common but has minimal downsides."]}, "2": {"attributes": [{"id": 1, "max": 20, "min": 16, "description": "{value}% Increased Attack Speed"}, {"id": 3, "max": 8, "min": 6, "description": "{value}% Less Damage"}, {"id": 4, "max": 100, "min": 81, "description": "{value} Increased Maximum Rage"}, {"id": 5, "max": 5, "min": 3, "description": "{value} Increased Elemental Resists"}, {"id": 7, "max": 5, "min": 3, "description": "{value} Increased Minion Attack Speed"}, {"id": 8, "value": 3, "description": "{value} Increased Light Radius"}], "description": "Made by Men, this blade is common but has minimal downsides."}}, "category": "weapon", "createdAt": 1649764095769, "isRetired": true, "shorthand": "14-1", "attributes": [{"id": 1, "max": 15, "min": 5, "value": 14, "variant": 1, "attributeId": 1, "description": "{value}% Increased Harvest Yield"}, {"id": 2, "max": 5, "min": 0, "value": 1, "variant": 1, "attributeId": 2, "description": "{value}% Harvest Fee"}, {"id": 3, "map": {"0": "EL", "1": "ELD", "2": "TIR", "3": "NEF", "4": "ITH", "5": "ITH", "6": "TAL", "7": "RAL", "8": "ORT", "9": "THUL", "10": "AMN", "11": "SOL", "12": "SHAEL"}, "max": 2, "min": 0, "value": 1, "variant": 1, "attributeId": 3, "description": "Harvest Fee Token: {value}"}, {"id": 55, "max": 2, "min": 2, "value": 2, "description": "{value} Sockets"}], "isDisabled": false, "isRuneword": true, "perfection": 0.85, "createdDate": 12111, "isCraftable": false, "isEquipable": true, "isTradeable": true, "shortTokenId": "10010000110141001100111...101", "isUnequipable": false, "isTransferable": true}, {"id": 3, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000030500020002000024182", "createdAt": 1649763909508, "perfection": 0.5}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10020000201000500240030991", "createdAt": 1649763909610, "perfection": 0.4}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030031002432194", "createdAt": 1649763909691, "perfection": 0.45}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100040033004045827", "createdAt": 1649763909821, "perfection": 0.3}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "1002000020100030034002847742", "createdAt": 1649763909914, "perfection": 0.43}, {"id": 2, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "100200002010006003200287488", "createdAt": 1649763909984, "perfection": 0.65}, {"id": 4, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "10010000410001000120319017", "createdAt": 1649763912928, "perfection": 1}]}, "characters": [{"id": 7, "from": "0x0000000000000000000000000000000000000000", "owner": "0x1cAA7069d4552055d3187097998504f9dd3CA496", "status": "created", "tokenId": "699", "transferredAt": 1627276078338}], "permissions": {"admin": {}}, "achievements": [1], "joinedGuildAt": 1627274005785, "rewardHistory": [], "lastGamePlayed": 0, "lifetimeRewards": {"items": [], "runes": {}}, "craftedItemCount": 7, "equippedItemCount": 0, "inventoryItemCount": 0, "transferredInCount": 0, "transferredOutCount": 2, "marketTradeSoldCount": 0, "guildMembershipTokenId": 699, "marketTradeListedCount": 0, "isGuildMembershipActive": true}

//   // {
//   //   "id": 1,
//   //   "key": "CRAFT_1",
//   //   "name": "New Beginnings",
//   //   "category": "Basic",
//   //   "isEnabled": true,
//   //   "icon": "undefinedimages/achievements/blue/s_030.PNG",
//   //   "points": 1,
//   //   "type": "Crafting",
//   //   "isCompleted": false,
//   //   "details": { "Date": "Anytime", "Total": 0 },
//   //   "branches": { "1": { "description": ["Craft 1 Runeword"] }, "2": { "description": "Craft 1 Runeword" } }
//   // },

//   const metaverse = await prisma.metaverse.findFirst({
//     where: { name: { equals: 'Arken' } },
//   })

//   for (const item of achievements) {
//

//     if (item.icon) item.icon = item.icon.replace('undefined', '')

//     await prisma.achievement.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//
//         name: item.name,
//         description: '',
//         key: item.key,
//         meta: item,
//         status: item.isEnabled ? 'Active' : 'Pending',
//
//       },
//     })
//   }
// }

async function migrateAreas() {
  for (const item of areas) {
    await prisma.gameArea.create({
      data: {
        metaverseId: map.Metaverse.Arken.id,
        name: item.name,
        description: item.description,
        key: item.id + '',
        meta: item,
        status: item.isEnabled ? 'Active' : 'Pending',
      },
    })

    // "types": [
    //   18
    // ],
    // "npcs": [],
    // "guilds": [],
    // "factions": [
    //   9
    // ],
    // "characters": [],
    // "characterTypes": [
    //   4,
    //   5,
    //   8,
    //   9,
    //   13,
    //   14
    // ],
    // "timeGates": [],
    // "itemMaterials": [
    //   1,
    //   3,
    //   4,
    //   5,
    //   9,
    //   14,
    //   21,
    //   22,
    //   23,
    //   37
    // ],
    // "biomes": [
    //   6,
    //   13,
    //   14,
    //   15,
    //   22,
    //   24,
    //   27,
    //   58,
    //   59
    // ]
  }
}
async function migrateCharacterAttributes() {
  for (const item of characterAttributes) {
    if (!item.name) continue;

    const mongo.existingItem = await CharacterAttribute.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterAttribute = new mongo.CharacterAttribute({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newCharacterAttribute.save();
  }
}

async function migrateSkillMods() {
  for (const item of skillMods) {
    if (!item.name) continue;

    const existingItem = await mongo.SkillMod.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillMod = new mongo.SkillMod({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkillMod.save();
  }
}

async function migrateSkillClassifications() {
  for (const item of skillClassifications) {
    if (!item.name) continue;

    const existingItem = await mongo.SkillClassification.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillClassification = new mongo.SkillClassification({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkillClassification.save();
  }
}

async function migrateSkillConditions() {
  for (const item of skillConditions) {
    if (!item.name) continue;

    const existingItem = await mongo.SkillCondition.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillCondition = new mongo.SkillCondition({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkillCondition.save();
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
    if (!item.name) continue;

    const existingItem = await mongo.SkillStatusEffect.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillStatusEffect = new mongo.SkillStatusEffect({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkillStatusEffect.save();
  }
}

async function migrateSkillTrees() {
  for (const item of skillTrees) {
    if (!item.name) continue;

    const existingItem = await mongo.SkillTree.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillTree = new mongo.SkillTree({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkillTree.save();
  }
}

async function migrateSkillTreeNodes() {
  for (const item of skillTreeNodes) {
    if (!item.name) continue;

    const existingItem = await mongo.SkillTreeNode.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkillTreeNode = new mongo.SkillTreeNode({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name + '',
      meta: item,
      status: 'Active',
    });

    await newSkillTreeNode.save();
  }
}

async function migrateSkills() {
  for (const item of skills) {
    if (!item.name) continue;

    const existingItem = await mongo.Skill.findOne({ name: item.name });
    if (existingItem) continue;

    const newSkill = new mongo.Skill({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newSkill.save();
  }
}

async function migrateItemTransmuteRules() {
  const transmuteRules = [
    { id: 1, name: 'Increase Attribute', chance: 0.1 },
    { id: 1, name: 'Decrease Attribute', chance: 0.01 },
  ];

  for (const item of transmuteRules) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemTransmuteRule.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemTransmuteRule = new mongo.ItemTransmuteRule({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newItemTransmuteRule.save();
  }
}

async function migrateCharacterTitles() {
  for (const item of characterTitles) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterTitle.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterTitle = new mongo.CharacterTitle({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newCharacterTitle.save();
  }
}

async function migrateCharacterTypes() {
  for (const item of characterTypes) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterType.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterType = new mongo.CharacterType({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newCharacterType.save();
  }
}

async function migrateActs() {
  for (const item of acts) {
    const existingItem = await mongo.Act.findOne({ name: item.name });
    if (existingItem) continue;

    const newAct = new mongo.Act({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newAct.save();
  }
}

async function migrateEras() {
  for (const item of eras) {
    const existingItem = await mongo.Era.findOne({ name: item.name });
    if (existingItem) continue;

    const newEra = new mongo.Era({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newEra.save();
  }
}

async function migratePlanets() {
  for (const item of planets) {
    const existingItem = await mongo.Planet.findOne({ name: item.name });
    if (existingItem) continue;

    const newPlanet = new mongo.Planet({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newPlanet.save();
  }
}

async function migrateSolarSystems() {
  for (const item of solarSystems) {
    const existingItem = await mongo.SolarSystem.findOne({ name: item.name });
    if (existingItem) continue;

    const newSolarSystem = new mongo.SolarSystem({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newSolarSystem.save();
  }
}

async function migrateLore() {
  for (const item of lore) {
    const existingItem = await mongo.Lore.findOne({ name: item.name });
    if (existingItem) continue;

    const newLore = new mongo.Lore({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.id + '',
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newLore.save();
  }
}

async function migrateGames() {
  for (const item of games) {
    const existingItem = await mongo.Game.findOne({ name: item.name });
    if (existingItem) continue;

    const newGame = new mongo.Game({
      metaverseId: map.Metaverse.Arken.id,
      productId: map.Game[item.name].id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newGame.save();
  }
}


async function migrateGameGuides() {
  // Fetch all game guides from Prisma
  // const gameGuides = await prisma.gameGuide.findMany()

  for (const item of gameInfo) {
    //

    // Check if the game guide already exists in MongoDB
    const existingGuide = await mongo.GameGuide.find({ name: item.name }).exec()

    if (existingGuide) {
      console.log(`Game guide with name ${item.name} already exists.`)
      continue
    }

    // Insert the game guide into MongoDB
    await mongo.GameGuide.create({
      metaverseId: map.Metaverse.Arken.id,
      gameId: gameNumberToGameId[item.game],
      //
      name: item.name,
      description: '',
      content: item.text,
      key: item.name,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
      attaachments: item.attachments,
      //
    })

    console.log(`Inserted game guide: ${item.name}`)
  }
}

// async function migrateGameGuides() {
//   for (const item of gameInfo) {
//

//     // {
//     //   "uuid": "reci6117DNFmvidls",
//     //   "name": "Introduction",
//     //   "text": "Rune: Infinite is a 2D Arena Brawler, the third game in the Arken ecosystem. The game demonstrates the seamless integration of NFT items into skill-based PvP gameplay and provides players with an exhilarating and challenging experience.\n\n\n",
//     //   "game": 3,
//     //   "isEnabled": true,
//     //   "attachments": []
//     // },
//     await prisma.gameGuide.create({
//       data: {
//         metaverseId: map.Metaverse.Arken.id,
//         gameId: gameNumberToGameId[item.game],
//
//         name: item.name,
//         description: '',
//         content: item.text,
//         key: item.name,
//         meta: item,
//         status: item.isEnabled ? 'Active' : 'Pending',
//
//       },
//     })
//   }
// }

async function migrateCharacterClasses() {
  for (const item of characterClasses) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterClass.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterClass = new mongo.CharacterClass({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isPlayable ? 'active' : 'draft',
    });

    await newCharacterClass.save();
  }
}

async function migrateCharacterFactions() {
  for (const item of characterFactions) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterFaction.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterFaction = new mongo.CharacterFaction({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newCharacterFaction.save();
  }
}

async function migrateAreaNameChoices() {
  for (const item of areaNameChoices) {
    if (!item.name) continue;

    const existingItem = await mongo.AreaNameChoice.findOne({ name: item.name });
    if (existingItem) continue;

    const newAreaNameChoice = new mongo.AreaNameChoice({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newAreaNameChoice.save();
  }
}

async function migrateCharacterNameChoices() {
  for (const item of characterNameChoices) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterNameChoice.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterNameChoice = new mongo.CharacterNameChoice({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newCharacterNameChoice.save();
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
//         status: item.isPlayable ? 'active' : 'draft',
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
//         status: item.isPlayable ? 'active' : 'draft',
//
//       },
//     })
//   }
// }

async function migrateAreaNameChoices() {
  for (const item of areaNameChoices) {
    if (!item.name) continue;

    const existingItem = await mongo.AreaNameChoice.findOne({ name: item.name });
    if (existingItem) continue;

    const newAreaNameChoice = new mongo.AreaNameChoice({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newAreaNameChoice.save();
  }
}

async function migrateCharacterNameChoices() {
  for (const item of characterNameChoices) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterNameChoice.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterNameChoice = new mongo.CharacterNameChoice({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      key: item.id + '',
      meta: item,
      status: 'Active',
    });

    await newCharacterNameChoice.save();
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
//         status: item.isPlayable ? 'active' : 'draft',
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
//         status: item.isPlayable ? 'active' : 'draft',
//
//       },
//     })
//   }
// }

async function migrateCharacterRaces() {
  for (const item of characterRaces) {
    if (!item.name) continue;

    const existingItem = await mongo.CharacterRace.findOne({ name: item.name });
    if (existingItem) continue;

    const newCharacterRace = new mongo.CharacterRace({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isPlayable ? 'active' : 'draft',
    });

    await newCharacterRace.save();
  }
}

async function migrateEnergies() {
  for (const item of energies) {
    if (!item.name) continue;

    const existingItem = await mongo.Energy.findOne({ name: item.name });
    if (existingItem) continue;

    const newEnergy = new mongo.Energy({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newEnergy.save();
  }
}

async function migrateNpcs() {
  for (const item of npcs) {
    if (!item.title) continue;

    const existingItem = await mongo.Npc.findOne({ name: item.title });
    if (existingItem) continue;

    const newNpc = new mongo.Npc({
      metaverseId: map.Metaverse.Arken.id,
      name: item.title,
      description: item.description,
      key: item.title,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newNpc.save();
  }
}

async function migrateAreaTypes() {
  for (const item of areaTypes) {
    if (!item.name) continue;

    const existingItem = await mongo.AreaType.findOne({ name: item.name });
    if (existingItem) continue;

    const newAreaType = new mongo.AreaType({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
    });

    await newAreaType.save();
  }
}

async function migrateAreaLandmarks() {
  for (const item of areaLandmarks) {
    if (!item.name) continue;

    const existingItem = await mongo.AreaLandmark.findOne({ name: item.name });
    if (existingItem) continue;

    const area = await mongo.Area.findOne({ key: item.area + '' });

    const newAreaLandmark = new mongo.AreaLandmark({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.isEnabled ? 'Active' : 'Pending',
      areaId: area ? area._id : null,
    });

    await newAreaLandmark.save();
  }
}

async function migrateBiomes() {
  for (const item of biomes) {
    if (!item.name) continue;

    const existingItem = await mongo.Biome.findOne({ name: item.name });
    if (existingItem) continue;

    const newBiome = new mongo.Biome({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newBiome.save();
  }
}

async function migrateBiomeFeatures() {
  for (const item of biomeFeatures) {
    if (!item.name) continue;

    const existingItem = await mongo.BiomeFeature.findOne({ name: item.name });
    if (existingItem) continue;

    const newBiomeFeature = new mongo.BiomeFeature({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newBiomeFeature.save();
  }
}

async function migrateItemSpecificTypes() {
  for (const item of itemSpecificTypes) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemType.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemSpecificType = new mongo.ItemType({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemSpecificType.save();
  }
}

async function migrateItemTypes() {
  for (const item of itemTypes) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemType.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemType = new mongo.ItemType({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemType.save();
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
}

async function migrateItemSlots() {
  for (const item of itemSlots) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemSlot.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemSlot = new mongo.ItemSlot({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemSlot.save();
  }
}

async function migrateItemSubTypes() {
  for (const item of itemSubTypes) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemSubType.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemSubType = new mongo.ItemSubType({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemSubType.save();
  }
}

async function migrateItemMaterials() {
  for (const item of itemMaterials) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemMaterial.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemMaterial = new mongo.ItemMaterial({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemMaterial.save();
  }
}

async function migrateItemRarities() {
  for (const item of itemRarities) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemRarity.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemRarity = new mongo.ItemRarity({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemRarity.save();
  }
}

async function migrateItemRecipes() {
  for (const item of itemRecipes) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemRecipe.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemRecipe = new mongo.ItemRecipe({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemRecipe.save();
  }
}

async function migrateItemSets() {
  for (const item of itemSets) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemSet.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemSet = new mongo.ItemSet({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemSet.save();
  }
}

async function migrateItemAttributes() {
  for (const item of itemAttributes) {
    if (!item.name) continue;

    const existingItem = await mongo.ItemAttribute.findOne({ name: item.name });
    if (existingItem) continue;

    const newItemAttribute = new mongo.ItemAttribute({
      metaverseId: map.Metaverse.Arken.id,
      name: item.name,
      description: '',
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newItemAttribute.save();
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
      status: 'paused', // 'Paused. Wait for Evo 2 and free account system.',
      claimedBy: 'Nobody yet.',
      description:
        'We would like Second Wind listed across as many gaming sites as possible. A minimum of 20 high-quality sites would be best.',
    },
    {
      name: 'Categorize AI generated items into mythic/epic/rare/magical',
      reward: '2 ZOD per item',
      status: 'paused', //'Paused. Wait for more items to be generated (October).',
      claimedBy: 'Nobody yet.',
      description:
        'We need help determining the quality of the AI at generated for our Runeword items. Mythics would be the most unique and high quality. Epics would be high quality and slightly unique or a bit less quality but very unique. Rare would be high quality and not unique at all, or low quality and very unique. Magical would be a mix of low quality or low uniqueness, but with some nice ones spread in there for RNG.\n\nThe operation is easy on a technical level, simply download a ZIP folder of the items and move them to the folder based on your judgment.',
    },
  ];

  for (const item of bounties) {
    if (!item.name) continue;

    const existingItem = await mongo.Bounty.findOne({ name: item.name });
    if (existingItem) continue;

    const newBounty = new mongo.Bounty({
      applicationId: map.Application.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: item.status,
    });

    await newBounty.save();
  }
}

async function migratePolls() {
  const polls = [];

  for (const item of polls) {
    if (!item.name) continue;

    const existingItem = await mongo.Poll.findOne({ name: item.name });
    if (existingItem) continue;

    const newPoll = new mongo.Poll({
      applicationId: map.Application.Arken.id,
      name: item.name,
      description: item.description,
      key: item.name,
      meta: item,
      status: 'Active',
    });

    await newPoll.save();
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
      status: 'done',
      rewards: [
        {
          name: `50 Zavox Tickets`,
          key: '50-zavox',
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
      status: 'done',
      rewards: [
        {
          name: `20 Zavox Tickets`,
          key: '20-zavox',
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
          status: 'done',
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
      status: 'pending',
      rewards: [
        {
          name: `50 Zavox Tickets`,
          key: '50-zavox',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `That's a lot of Zavox, think of the possibilities...`,
        },
        {
          name: `Giveaway Item`,
          key: 'giveaway-item',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `Item from the Giveaway Wallet that wasn't given away. Time to search the inventory..`,
        },
        {
          name: `$50 Cash`,
          key: '50-cash',
          status: 'pending',
          entries: [],
          raffleRequirementsOnRaffleRewards: { raffleRequirement: { key: 'won1PreviousReward' } },
          content: `We're talking cold hard cash here...`,
        },
        {
          name: `Zavox Ticket`,
          key: '1-zavox',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `You definitely like RNG.`,
        },
        {
          name: `Character Slot Redemption Scroll`,
          key: 'character-slot',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `This is the same scroll that's transmuted using 1 ZOD.`,
        },
        {
          name: `Dev Fee Acquisition`,
          key: 'dev-fee',
          status: 'pending',
          entries: [],
          content: `You'll receive 0.1% of all RXS transactions for the next month. Yum.`,
        },
        {
          name: `Binzy's Blessing`,
          key: 'binzy-blessing',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `You'll receive one random item from Binzy.`,
        },
        {
          name: `General's Medallion`,
          key: 'medallion',
          status: 'pending',
          raffleRequirementsOnRaffleRewards: [],
          entries: [],
          content: `You'll receive one Magical General's Medallion.`,
        },
        {
          name: `Character`,
          key: 'character',
          status: 'pending',
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
  //       applicationId: map.Application.Arken.id,
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
  //         applicationId: map.Application.Arken.id,
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
  //           applicationId: map.Application.Arken.id,
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
  let arkenOmniverse = await mongo.Omniverse.findOne({ name: 'Arken' }).exec()

  if (!arkenOmniverse)
    arkenOmniverse = await mongo.Omniverse.create({
      name: 'Arken',
      key: 'arken',
    })

  map.Omniverse.Arken = arkenOmniverse

  let arkenMetaverse = await mongo.Metaverse.findOne({ name: 'Arken' }).exec()

  if (!arkenMetaverse)
    arkenMetaverse = await mongo.Metaverse.create({
      omniverseeId: arkenOmniverse.id,
      name: 'Arken',
      key: 'arken',
    })

  map.Metaverse.Arken = arkenMetaverse.id

  let arkenOrganization = await mongo.Organization.findOne({ name: 'Arken' }).exec()

  if (!arkenOrganization)
    arkenOrganization = await mongo.Organization.create({
      name: 'Arken',
    })

  map.Organization.Arken = arkenOrganization

  let returnOrganization = await mongo.Organization.findOne({ name: 'Return' }).exec()

  if (!returnOrganization)
    returnOrganization = await mongo.Organization.create({
      name: 'Return',
    })

  map.Organization.Return = returnOrganization

  let asiOrganization = await mongo.Organization.findOne({ name: 'ASI' }).exec()

  if (!asiOrganization)
    asiOrganization = await mongo.Organization.create({
      name: 'ASI',
    })

  map.Organization.ASI = asiOrganization

  let userRole = await mongo.Role.findOne({ name: 'User' }).exec()

  if (!userRole)
    userRole = await mongo.Role.create({
      organizationId: arkenOrganization.id,
      name: 'User',
    })

  map.Role.User = userRole

  let zen0Account = await mongo.Account.findOne({ name: 'zen0' }).exec()

  if (!zen0Account)
    zen0Account = await mongo.Account.create({
      organizationId: arkenOrganization.id,
      name: 'zen0',
    })

  map.Account.zen0 = zen0Account

  let zen0Profile = await mongo.Profile.findOne({ name: 'zen0' }).exec()

  if (!zen0Profile)
    zen0Profile = await mongo.Profile.create({
      organizationId: arkenOrganization.id,
      name: 'zen0',
    })

  map.Profile.zen0 = zen0Profile

  let bscChain = await mongo.Chain.findOne({ name: 'BSC' }).exec()

  if (!bscChain)
    bscChain = await mongo.Chain.create({
      organizationId: arkenOrganization.id,
      name: 'BSC',
    })

  map.Chain.BSC = bscChain

  let cerebroApplication = await mongo.Application.findOne({ name: 'Cerebro' }).exec()

  if (!cerebroApplication)
    cerebroApplication = await mongo.Application.create({
      organizationId: map.Organization.ASI.id,
      omniverseId: arkenOmniverse.id,
      name: 'Cerebro',
      key: 'cerebro',
    })

  map.Application.Cerebro = cerebroApplication.id

  let infiniteArenaApplication = await mongo.Application.findOne({
    name: 'Arken: Infinite Arena',
  }).exec()

  if (!infiniteArenaApplication)
    infiniteArenaApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })

  map.Application[infiniteArenaApplication.name] = infiniteArenaApplication

  let infiniteArenaProduct = await mongo.Product.findOne({ name: 'Arken: Infinite Arena' }).exec()

  if (!infiniteArenaProduct)
    infiniteArenaProduct = await mongo.Product.create({
      applicationId: infiniteArenaApplication.id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })

  map.Product[infiniteArenaProduct.name] = infiniteArenaProduct

  let infiniteArenaGame = await mongo.Game.findOne({ name: 'Arken: Infinite Arena' }).exec()

  if (!infiniteArenaGame)
    infiniteArenaGame = await mongo.Game.create({
      productId: infiniteArenaProduct.id,
      name: 'Arken: Infinite Arena',
      key: 'arken-arena',
    })
  map.Game['Arken: Infinite Arena'] = infiniteArenaGame.id

  let evolutionApplication = await mongo.Application.findOne({
    name: 'Arken: Evolution Isles',
  }).exec()

  if (!evolutionApplication)
    evolutionApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  map.Application[evolutionApplication.name] = evolutionApplication

  let evolutionProduct = await mongo.Product.findOne({ name: 'Arken: Evolution Isles' }).exec()

  if (!evolutionProduct)
    evolutionProduct = await mongo.Product.create({
      applicationId: evolutionApplication.id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  map.Product[evolutionProduct.name] = evolutionProduct

  let evolutionGame = await mongo.Game.findOne({ name: 'Arken: Evolution Isles' }).exec()

  if (!evolutionGame)
    evolutionGame = await mongo.Game.create({
      productId: evolutionProduct.id,
      name: 'Arken: Evolution Isles',
      key: 'arken-isles',
    })

  map.Game['Arken: Evolution Isles'] = evolutionGame

  let oasisApplication = await mongo.Application.findOne({
    name: 'Arken: Heart of the Oasis',
  }).exec()

  if (!oasisApplication)
    oasisApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  map.Product[infiniteArenaProduct.name] = infiniteArenaProduct

  let oasisProduct = await mongo.Product.findOne({ name: 'Arken: Heart of the Oasis' }).exec()

  if (!oasisProduct)
    oasisProduct = await mongo.Product.create({
      applicationId: oasisApplication.id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  map.Product[oasisProduct.name] = oasisProduct

  let oasisGame = await mongo.Game.findOne({ name: 'Arken: Heart of the Oasis' })

  if (!oasisGame)
    oasisGame = await mongo.Game.create({
      productId: oasisProduct.id,
      name: 'Arken: Heart of the Oasis',
      key: 'arken-oasis',
    })

  map.Game['Arken: Heart of the Oasis'] = oasisGame

  let raidsApplication = await mongo.Application.findOne({ name: 'Arken: Runic Raids' }).exec()

  if (!raidsApplication)
    raidsApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  map.Product[infiniteArenaProduct.name] = infiniteArenaProduct

  let raidsProduct = await mongo.Product.findOne({ name: 'Arken: Runic Raids' }).exec()

  if (!raidsProduct)
    raidsProduct = await mongo.Product.create({
      applicationId: raidsApplication.id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  map.Product[raidsProduct.name] = raidsProduct

  let raidGame = await mongo.Game.findOne({ name: 'Arken: Runic Raids' }).exec()

  if (!raidGame)
    raidGame = await mongo.Game.create({
      productId: raidsProduct.id,
      name: 'Arken: Runic Raids',
      key: 'arken-raids',
    })

  map.Game['Arken: Runic Raids'] = raidGame

  let strikeApplication = await mongo.Application.findOne({ name: 'Arken: Strike Legends' }).exec()

  if (!strikeApplication)
    strikeApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  map.Application[strikeApplication.name] = strikeApplication

  let strikeProduct = await mongo.Product.findOne({ name: 'Arken: Strike Legends' }).exec()

  if (!strikeProduct)
    strikeProduct = await mongo.Product.create({
      applicationId: strikeApplication.id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  map.Product[strikeProduct.name] = strikeProduct

  let strikeGame = await mongo.Game.findOne({ name: 'Arken: Strike Legends' }).exec()

  if (!strikeGame)
    strikeGame = await mongo.Game.create({
      productId: strikeProduct.id,
      name: 'Arken: Strike Legends',
      key: 'arken-legends',
    })

  map.Game['Arken: Strike Legends'] = strikeGame

  let guardiansApplication = await mongo.Application.findOne({
    name: 'Arken: Guardians Unleashed',
  }).exec()

  if (!guardiansApplication)
    guardiansApplication = await mongo.Application.create({
      organizationId: map.Organization.Arken.id,
      omniverseId: arkenOmniverse.id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })

  map.Application[guardiansApplication.name] = guardiansApplication

  let guardiansProduct = await mongo.Product.findOne({ name: 'Arken: Guardians Unleashed' }).exec()

  if (!guardiansProduct)
    guardiansProduct = await mongo.Product.create({
      applicationId: guardiansApplication.id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })

  map.Product[guardiansProduct.name] = guardiansProduct

  let guardiansGame = await mongo.Game.findOne({ name: 'Arken: Guardians Unleashed' }).exec()

  if (!guardiansGame)
    guardiansGame = await mongo.Game.create({
      productId: guardiansProduct.id,
      name: 'Arken: Guardians Unleashed',
      key: 'arken-guardians',
    })

  map.Game['Arken: Guardians Unleashed'] = guardiansGame
  console.log('ee')
}

async function main() {
  console.log('aa')
  await prisma.$connect()
  console.log('bb')
  mongoose = await Mongoose.connect(process.env.MONGO_ENDPOINT, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    retryWrites: false,
  } as any)
  console.log('cc')
  const models = [
    'Application',
    'Organization',
    'Account',
    'Profile',
    'Video',
    'VideoScene',
    'Agent',
    'Memory',
    'Conversation',
    'Data',
    'Log',
    'Job',
    'CryptoToken',
    'NewsArticle',
    'Comment',
    'Question',
    'Topic',
    'WorldEvent',
    'CollectibleCollection',
    'CollectibleCardBox',
    'CollectibleCardPack',
    'CollectibleCard',
    'Stock',
    'Asset',
    'GameItem',
    'Badge',
    'BattlePass',
    'Bounty',
    'Collection',
    'Community',
    'Discussion',
    'Event',
    'Exchange',
    'File',
    'Idea',
    'Leaderboard',
    'AssetLicense',
    'MarketPair',
    'Market',
    'Message',
    'Offer',
    'Order',
    'Product',
    'Project',
    'Rating',
    'GameRealm',
    'Review',
    'Role',
    'GameServer',
    'Session',
    'Suggestion',
    'Tag',
    'GameTournament',
    'Trade',
    'Transaction',
    'Vote',
    'Payment',
    'Referral',
    'Permission',
    'Stat',
    'RecordUpdate',
    'Form',
    'FormSubmission',
    'GameCharacter',
    'GameTeam',
    'GameNpc',
    'Metaverse',
    'GameSkill',
    'GameSkillMod',
    'GameSkillClassification',
    'GameSkillCondition',
    'GameSkillStatusEffect',
    'GameSkillTree',
    'GameSkillTreeNode',
    'GameCharacterAbility',
    'GameCharacterAttribute',
    'GameCharacterType',
    'GameItemAttribute',
    'GameItemMaterial',
    'GameItemSet',
    'GameItemSlot',
    'GameItemRarity',
    'GameItemType',
    'GameItemSubType',
    'GameItemSpecificType',
    'GameItemAffix',
    'GameItemRecipe',
    'GameItemSkin',
    'GameStash',
    'GameBiome',
    'GameBiomeFeature',
    'GamePlanet',
    'GameSolarSystem',
    'GameGalaxy',
    'GameStar',
    'GameUniverse',
    'GameQuest',
    'GameArea',
    'GameAreaType',
    'GameAreaLandmark',
    'GameAct',
    'GameCharacterClass',
    'GameCharacterRace',
    'GameCharacterGender',
    'GameCharacterPersonality',
    'GameCharacterTitle',
    'GameAreaNameChoice',
    'GameCharacterNameChoice',
    'GameCharacterFaction',
    'GameEra',
    'GameSeason',
    'GameLore',
    'GameEnergy',
    'GameGuide',
    'Game',
    'Validator',
    'Poll',
    'ProductUpdate',
    'Raffle',
    'RaffleRequirement',
    'RaffleReward',
    'RaffleEntry',
    'Proposal',
    'Company',
    'Person',
    'Omniverse',
  ]

  for (const model of models) {
    mongo[model] = new ModelWrapper(Mongoose.model(model, schemas[model], model))
  }

  await createOmniverse()
  await migrateCharacterAttributes()

  await migrateGameGuides() //
  await migrateAssets() //
  await migrateItemAttributes() //
  await migrateItemRecipes() //
  await migrateItemMaterials() //
  // // await migrateItemAttributeParams() // forget about this?
  // // await migrateItemParams() // forget about this?
  // await migrateItemSpecificTypes() //
  // await migrateItemSubTypes() //
  // await migrateItemTypes() //
  // await migrateItemAffixes()
  // await migrateItemSlots() //
  // await migrateItemRarities() //
  // await migrateItemSets() //
  // await migrateItemTransmuteRules() // fill this in and do later
  // await migrateSkills() //
  // await migrateSkillMods() //
  // await migrateSkillClassifications() //
  // await migrateSkillConditions() //
  // // await migrateSkillConditionParams() // dont need??
  // await migrateSkillStatusEffects() //
  // await migrateSkillTrees() // fill in and do again later
  // await migrateSkillTreeNodes() //
  // await migrateCharacterGuilds() //
  // await migrateCharacterRaces() //
  // await migrateCharacterGenders() //
  // await migrateCharacterFactions() //
  // await migrateCharacterClasses() //
  // await migrateCharacters() //
  // await migrateCharacterTypes() //
  // await migrateCharacterAttributes() //
  // await migrateCharacterStats() // merged into attributes
  // await migrateCharacterTitles() //
  // await migrateCharacterSpawnRules() // unused
  // await migrateCharacterFightingStyles() // unused
  // await migrateCharacterNameChoices() //
  // await migrateCharacterMovementStasuses() // unused
  // await migrateCharacterPersonalities() // unused
  // await migrateAreas() //
  // // await migrateAreaTypes() // not sure
  // await migrateAreaNameChoices() //
  // await migrateEnergies() //
  // await migrateLores() //
  // // await migrateHistoricalRecords() // none
  // await migrateNpcs() //
  // await migrateActs() //
  // await migrateEras() //
  // await migrateAreaLandmarks() //
  // await migrateAchievements() //
  // await migrateBiomeFeatures() //
  // await migrateBiomes() // needs to be rerun
  // await migrateSolarSystems() //
  // await migratePlanet() //
  //
  // await migrateAccounts() //
  // await migrateClaims() //
  // await migrateGameItems()
  // await migrateTrades()
  // await migrateTeams()
  // await migrateReferrals()
  // await migrateBounties() //
  // await migrateRaffles()
  // await migratePolls()
  // await migrateProposals()
  // await migrateForms()
  // await aggregateStudios()

  await prisma.$disconnect()
}

main().catch(async e => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

//   [
//     "Rune",
//     "Game",
//     "GameInfo",
//     "Item",
//     "ItemAttribute",
//     "ItemRecipe",
//     "ItemMaterial",
//     "ItemAttributeParam",
//     "ItemParam",
//     "ItemSpecificType",
//     "ItemSubType",
//     "ItemType",
//     "ItemAffix",
//     "ItemSlot",
//     "ItemRarity",
//     "ItemSet",
//     "ItemTransmuteRule",
//     "Skill",
//     "SkillMod",
//     "SkillClassification",
//     "SkillCondition",
//     "SkillConditionParam",
//     "SkillStatusEffect",
//     "SkillTreeNode",
//     "CharacterGuild",
//     "CharacterRace",
//     "CharacterGender",
//     "CharacterFaction",
//     "CharacterClass",
//     "Character",
//     "CharacterType",
//     "CharacterAttribute",
//     "CharacterStat",
//     "CharacterTitle",
//     "CharacterSpawnRule",
//     "CharacterFightingStyle",
//     "CharacterNameChoice",
//     "CharacterMovementStasuse",
//     "CharacterPersonality",
//     "Area",
//     "AreaType",
//     "AreaNameChoice",
//     "Energy",
//     "Lore",
//     "HistoricalRecords",
//     "NPC",
//     "Act",
//     "Era",
//     "TimeGate",
//     "Energie",
//     "Achievement",
//     "Biome",
//     "BiomeFeature",
//     "SolarSystem",
//     "Planet"
// ]
