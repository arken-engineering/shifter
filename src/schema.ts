import mongoose from 'mongoose'

const { Schema } = mongoose

// export const Organization = new Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
//     data: { type: Object, default: {} },
//     meta: { type: Object, default: {} },
//     createdDate: { type: Date, default: Date.now },
//     updatedDate: { type: Date },
//     deletedDate: { type: Date },
//   },
//   {
//     collection: 'Organization',
//     timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
//   }
// )

// Organization.index({ name: 1 }, { unique: true })

// Organization.virtual('applications', {
//   ref: 'Application',
//   localField: '_id',
//   foreignField: 'organizationId',
// })

// Organization.virtual('accounts', {
//   ref: 'Account',
//   localField: '_id',
//   foreignField: 'organizationId',
// })

export const Account = new Schema(
  {
    metaverseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Metaverse',
      required: true,
    },
    // organizationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Organization'
    // },
    username: { type: String, required: true },
    email: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'User', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

Account.index({ metaverseId: 1, username: 1 }, { unique: true })

Account.virtual('profiles', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'accountId',
})

export const Profile = new Schema(
  {
    metaverseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Metaverse',
      required: true,
    },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true },
    key: { type: String, maxlength: 100 },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    points: { type: Number },
    coins: { type: Number },
    activityRating: { type: Number, default: 0 },
    address: { type: String, maxlength: 100 },
    avatar: { type: String, maxlength: 100 },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
    privateKey: { type: String, maxlength: 300 },
    signature: { type: String, maxlength: 200 },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    chainId: { type: Schema.Types.ObjectId, ref: 'Chain' },
  },
  { collection: 'Profile', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Application = new Schema(
  {
    metaverseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Metaverse',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'Application',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

Application.index({ name: 1 }, { unique: true })

Application.virtual('agents', {
  ref: 'Agent',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('chain', {
  ref: 'Chain',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('account', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('assets', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('badges', {
  ref: 'Badge',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('battlePasses', {
  ref: 'BattlePass',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('communities', {
  ref: 'Community',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('discussions', {
  ref: 'Discussion',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('exchanges', {
  ref: 'Exchange',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('ideas', {
  ref: 'Idea',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('leaderboards', {
  ref: 'Leaderboard',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('assetLicenses', {
  ref: 'AssetLicense',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('logs', {
  ref: 'Log',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('marketPairs', {
  ref: 'MarketPair',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('markets', {
  ref: 'Market',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('offers', {
  ref: 'Offer',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('realms', {
  ref: 'Realm',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('roles', {
  ref: 'Role',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('gameServers', {
  ref: 'Server',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('suggestions', {
  ref: 'Suggestion',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('tags', {
  ref: 'Tag',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('tokens', {
  ref: 'ChainToken',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('tradeIdeas', {
  ref: 'TradeIdea',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('trades', {
  ref: 'Trade',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('buyerTrades', {
  ref: 'Trade',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('transactions', {
  ref: 'ChainTransaction',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('payments', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('permissions', {
  ref: 'Permission',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('stats', {
  ref: 'Stat',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('recordUpdates', {
  ref: 'RecordUpdate',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('forms', {
  ref: 'Form',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characters', {
  ref: 'Character',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('metaverses', {
  ref: 'Metaverse',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('omniverses', {
  ref: 'Omniverse',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('referrals', {
  ref: 'Referral',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('recipientReferrals', {
  ref: 'Referral',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('senderReferrals', {
  ref: 'Referral',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('chains', {
  ref: 'Chain',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterAbilities', {
  ref: 'CharacterAbility',
  localField: '_id',
  foreignField: 'applicationId',
})
Application.virtual('tournaments', {
  ref: 'Tournament',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skills', {
  ref: 'Skill',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemRecipes', {
  ref: 'ItemRecipe',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemSkins', {
  ref: 'ItemSkin',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('stashes', {
  ref: 'Stash',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('biomes', {
  ref: 'Biome',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('planets', {
  ref: 'Planet',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('solarSystems', {
  ref: 'SolarSystem',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('universes', {
  ref: 'Universe',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('stars', {
  ref: 'Star',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('areas', {
  ref: 'Area',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('acts', {
  ref: 'Act',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterClasses', {
  ref: 'CharacterClass',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterFactions', {
  ref: 'CharacterFaction',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('eras', {
  ref: 'Era',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('seasons', {
  ref: 'Season',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemAttributes', {
  ref: 'ItemAttribute',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemMaterials', {
  ref: 'ItemMaterial',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemSets', {
  ref: 'ItemSet',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemSlots', {
  ref: 'ItemSlot',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemRarities', {
  ref: 'ItemRarity',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemTypes', {
  ref: 'ItemType',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemSubTypes', {
  ref: 'ItemSubType',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('itemSpecificTypes', {
  ref: 'ItemSpecificType',
  localField: '_id',
  foreignField: 'applicationId',
})
Application.virtual('characterGenders', {
  ref: 'CharacterGender',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterRaces', {
  ref: 'CharacterRace',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterPersonalities', {
  ref: 'CharacterPersonality',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterTitles', {
  ref: 'CharacterTitle',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('lores', {
  ref: 'Lore',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('energies', {
  ref: 'Energy',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('guides', {
  ref: 'Guide',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('achievements', {
  ref: 'Achievement',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('games', {
  ref: '',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('npcs', {
  ref: 'Npc',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterAttributes', {
  ref: 'CharacterAttribute',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterTypes', {
  ref: 'CharacterType',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('areaTypes', {
  ref: 'AreaType',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('areaLandmarks', {
  ref: 'AreaLandmark',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('biomeFeatures', {
  ref: 'BiomeFeature',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillMods', {
  ref: 'SkillMod',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillClassifications', {
  ref: 'SkillClassification',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillConditions', {
  ref: 'SkillCondition',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillStatusEffects', {
  ref: 'SkillStatusEffect',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillTrees', {
  ref: 'SkillTree',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('skillTreeNodes', {
  ref: 'SkillTreeNode',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('areaNameChoices', {
  ref: 'AreaNameChoice',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('characterNameChoices', {
  ref: 'CharacterNameChoice',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('validators', {
  ref: 'Validator',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('productUpdates', {
  ref: 'ProductUpdate',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('polls', {
  ref: 'Poll',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('galaxies', {
  ref: 'Galaxy',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('quests', {
  ref: 'Quest',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('raffles', {
  ref: 'Raffle',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('raffleEntries', {
  ref: 'RaffleEntry',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('raffleRequirements', {
  ref: 'RaffleRequirement',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('raffleRewards', {
  ref: 'RaffleReward',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('proposals', {
  ref: 'Proposal',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('companies', {
  ref: 'Company',
  localField: '_id',
  foreignField: 'applicationId',
})

Application.virtual('people', {
  ref: 'Person',
  localField: '_id',
  foreignField: 'applicationId',
})

export const Video = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Video', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const VideoScene = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'VideoScene',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const Agent = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Agent', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Memory = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    description: { type: String },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Memory', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Conversation = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    userId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    messages: [],
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    meta: { type: Object, default: {} },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'Conversation',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const Data = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    mod: { type: String, required: true },
    key: { type: String, required: true },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Data', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)
Data.index({ applicationId: 1, mod: 1, key: 1 }, { unique: true })

export const Log = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    mod: { type: String, required: true },
    messages: { type: Array },
    tags: { type: Array },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
  },
  { collection: 'Log', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

Log.index({ deletedDate: 1 })
Log.index({ mod: 1 })
Log.index({ status: 1 })
Log.index({ createdDate: 1, updatedDate: 1 })

export const Job = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    mod: { type: String, required: true },
    key: { type: String, required: true },
    startDate: { type: Date },
    expireDate: { type: Date },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Job', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)
Job.index({ applicationId: 1, mod: 1, key: 1 }, { unique: true })

export const NewsArticle = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: [3, 'Minimum length: 3'],
      maxlength: [50, 'Maximum length: 50'],
      trim: true,
    },
    href: { type: String, required: true },
    source: { type: String, required: true },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'NewsArticle',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)
NewsArticle.index({ applicationId: 1, name: 1, source: 1 }, { unique: true })

export const Comment = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    body: { type: String, required: true },
    entity: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'entityModel',
    },
    entityModel: {
      type: String,
      required: true,
      enum: ['NewsArticle', 'ChainToken'],
    },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },

    text: { type: String, required: true },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
  },
  { collection: 'Comment', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Question = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    key: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    text: { type: String, required: true },
    answer: { type: String, required: true },
    popularity: { type: Number },
    topics: { type: Array },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Question', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Topic = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    key: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    text: { type: String, required: true },
    popularity: { type: Number },
    tags: { type: Array },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Topic', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const WorldEvent = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    key: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    text: { type: String, required: true },
    importance: { type: Number },
    tags: { type: Array },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'WorldEvent',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const CollectibleCollection = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    hype: { type: Number },
    value: { type: Number },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'CollectibleCollection',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const CollectibleCardBox = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    collectibleCollectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollectibleCollection',
    },
    name: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    franchise: {
      type: String,
      required: true,
      trim: true,
    },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'CollectibleCardBox',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const CollectibleCardPack = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    collectibleCollectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollectibleCollection',
    },
    name: {
      type: String,
      required: true,
      minlength: [2, 'Minimum length: 2'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    franchise: {
      type: String,
      required: true,
      trim: true,
    },
    ungraded: { type: Number },
    grade10: { type: Number },
    grade9: { type: Number },
    grade8: { type: Number },
    grade7: { type: Number },
    grade6: { type: Number },
    grade5: { type: Number },
    grade4: { type: Number },
    grade3: { type: Number },
    grade2: { type: Number },
    grade1: { type: Number },
    additional: { type: String },
    code: { type: String },
    hype: { type: Number },
    series: { type: String },
    category: { type: String },
    year: { type: Number },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'CollectibleCardPack',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const CollectibleCard = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    collectibleCollectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollectibleCollection',
    },
    name: {
      type: String,
      required: true,
      minlength: [1, 'Minimum length: 1'],
      maxlength: [200, 'Maximum length: 200'],
      trim: true,
    },
    franchise: {
      type: String,
      required: true,
      trim: true,
    },
    ungraded: { type: Number },
    grade10: { type: Number },
    grade9: { type: Number },
    grade8: { type: Number },
    grade7: { type: Number },
    grade6: { type: Number },
    grade5: { type: Number },
    grade4: { type: Number },
    grade3: { type: Number },
    grade2: { type: Number },
    grade1: { type: Number },
    additional: { type: String },
    code: { type: String },
    hype: { type: Number },
    series: { type: String },
    category: { type: String },
    year: { type: Number },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'CollectibleCard',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)

export const Stock = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    rank: { type: Number, min: 0 },
    name: { type: String, required: true },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    price: { type: Number, min: 0 },
    hourChange: { type: Number },
    dayChange: { type: Number },
    weekChange: { type: Number },
    marketCap: { type: Number, min: 0 },
    volume: { type: Number, min: 0 },
    ticker: { type: String, required: true },
    unusualActivity: { type: Number, min: 0 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  { collection: 'Stock', timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } }
)

export const Chain = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    description: { type: String },
    content: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Metaverse',
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
    type: { type: String, maxlength: 100 },
    standard: { type: String, maxlength: 100 },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Chain',
  }
)

Chain.index({ deletedDate: 1 })
Chain.index({ key: 1 })
Chain.index({ name: 1 })
Chain.index({ status: 1 })
Chain.index({ createdDate: 1, updatedDate: 1 })

Chain.virtual('transactions', {
  ref: 'ChainTransaction',
  localField: '_id',
  foreignField: 'chainId',
})

Chain.virtual('contracts', {
  ref: 'ChainContract',
  localField: '_id',
  foreignField: 'chainId',
})

Chain.virtual('tokens', {
  ref: 'ChainToken',
  localField: '_id',
  foreignField: 'chainId',
})

export const ChainContract = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  key: { type: String, maxlength: 100 },
  description: { type: String, required: true },
  content: { type: String, required: true },
  meta: { type: Object, default: {} },
  status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
  createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
  editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
  deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
  type: { type: String, maxlength: 100 },
  standard: { type: String, maxlength: 100 },
})

export const ChainToken = new Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    rank: { type: Number, min: 0 },
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, maxlength: 100 },
    standard: { type: String, maxlength: 100 },
    price: { type: Number, min: 0 },
    hourChange: { type: Number },
    dayChange: { type: Number },
    weekChange: { type: Number },
    marketCap: { type: Number, min: 0 },
    volume: { type: Number, min: 0 },
    symbol: { type: String, required: true },
    circulatingSupply: { type: Number, min: 0 },
    cmcLink: { type: String },
    movementDown: { type: Number, min: 0 },
    movementUp: { type: Number, min: 0 },
    enteredTop100: { type: Number, min: 0 },
    exitedTop100: { type: Number, min: 0 },
    largeMoveDown: { type: Number, min: 0 },
    data: { type: Object, default: {} },
    meta: { type: Object, default: {} },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    collection: 'ChainToken',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)
ChainToken.index({ applicationId: 1, symbol: 1 }, { unique: true })

export const Asset = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    uri: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    chainId: { type: Schema.Types.ObjectId, ref: 'Chain' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    type: { type: String, maxlength: 100 },
    standard: { type: String, maxlength: 100 },
    licenseId: { type: String },

    license: { type: Schema.Types.ObjectId, ref: 'AssetLicense' },
    chain: { type: Schema.Types.ObjectId, ref: 'Chain' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Asset',
  }
)

Asset.index({ deletedDate: 1 })
Asset.index({ key: 1 })
Asset.index({ name: 1 })
Asset.index({ status: 1 })
Asset.index({ createdDate: 1, updatedDate: 1 })

export const Item = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    token: { type: String, maxlength: 500 },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    chainId: { type: Schema.Types.ObjectId, ref: 'Chain', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Item',
  }
)

Item.index({ deletedDate: 1 })
Item.index({ key: 1 })
Item.index({ name: 1 })
Item.index({ status: 1 })
Item.index({ createdDate: 1, updatedDate: 1 })

export const ItemTransmute = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    token: { type: String, maxlength: 500 },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
    gameItemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    chain: { type: Schema.Types.ObjectId, ref: 'Chain' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemTransmute',
  }
)

ItemTransmute.index({ deletedDate: 1 })
ItemTransmute.index({ key: 1 })
ItemTransmute.index({ name: 1 })
ItemTransmute.index({ status: 1 })
ItemTransmute.index({ createdDate: 1, updatedDate: 1 })

ItemTransmute.virtual('item', {
  ref: 'Item',
  localField: 'gameItemId',
  foreignField: '_id',
})

ItemTransmute.virtual('asset', {
  ref: 'Asset',
  localField: 'assetId',
  foreignField: '_id',
})

export const Badge = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Badge',
  }
)

Badge.index({ deletedDate: 1 })
Badge.index({ key: 1 })
Badge.index({ name: 1 })
Badge.index({ status: 1 })
Badge.index({ createdDate: 1, updatedDate: 1 })

export const BattlePass = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    description: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'BattlePass',
  }
)

BattlePass.index({ deletedDate: 1 })
BattlePass.index({ key: 1 })
BattlePass.index({ name: 1 })
BattlePass.index({ status: 1 })
BattlePass.index({ createdDate: 1, updatedDate: 1 })

export const Bounty = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    description: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Bounty',
  }
)

Bounty.index({ deletedDate: 1 })
Bounty.index({ key: 1 })
Bounty.index({ name: 1 })
Bounty.index({ status: 1 })
Bounty.index({ createdDate: 1, updatedDate: 1 })

export const Collection = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Collection',
  }
)

Collection.index({ deletedDate: 1 })
Collection.index({ key: 1 })
Collection.index({ name: 1 })
Collection.index({ status: 1 })
Collection.index({ createdDate: 1, updatedDate: 1 })

export const Community = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ideas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Community',
  }
)

Community.index({ deletedDate: 1 })
Community.index({ key: 1 })
Community.index({ name: 1 })
Community.index({ status: 1 })
Community.index({ createdDate: 1, updatedDate: 1 })

export const Discussion = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    content: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    parentId: { type: String },
    rootMessageId: { type: String },
    type: { type: String, default: 'Discussion' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Discussion',
  }
)

Discussion.index({ deletedDate: 1 })
Discussion.index({ key: 1 })
Discussion.index({ name: 1 })
Discussion.index({ status: 1 })
Discussion.index({ createdDate: 1, updatedDate: 1 })

export const Event = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Event',
  }
)

Event.index({ deletedDate: 1 })
Event.index({ key: 1 })
Event.index({ name: 1 })
Event.index({ status: 1 })
Event.index({ createdDate: 1, updatedDate: 1 })

export const Exchange = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Exchange',
  }
)

Exchange.index({ deletedDate: 1 })
Exchange.index({ key: 1 })
Exchange.index({ name: 1 })
Exchange.index({ status: 1 })
Exchange.index({ createdDate: 1, updatedDate: 1 })

export const File = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    storageType: { type: String, maxlength: 100 },
    accessType: { type: String, maxlength: 100 },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'File',
  }
)

File.index({ deletedDate: 1 })
File.index({ key: 1 })
File.index({ name: 1 })
File.index({ status: 1 })
File.index({ createdDate: 1, updatedDate: 1 })

export const Idea = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    type: { type: String, maxlength: 100 },
    communityId: { type: Schema.Types.ObjectId, ref: 'Community' },
    community: { type: Schema.Types.ObjectId, ref: 'Community' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Idea',
  }
)

Idea.index({ deletedDate: 1 })
Idea.index({ key: 1 })
Idea.index({ name: 1 })
Idea.index({ status: 1 })
Idea.index({ createdDate: 1, updatedDate: 1 })

export const Leaderboard = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Leaderboard',
  }
)

Leaderboard.index({ deletedDate: 1 })
Leaderboard.index({ key: 1 })
Leaderboard.index({ name: 1 })
Leaderboard.index({ status: 1 })
Leaderboard.index({ createdDate: 1, updatedDate: 1 })

export const AssetLicense = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'AssetLicense',
  }
)

AssetLicense.index({ deletedDate: 1 })
AssetLicense.index({ key: 1 })
AssetLicense.index({ name: 1 })
AssetLicense.index({ status: 1 })
AssetLicense.index({ createdDate: 1, updatedDate: 1 })

export const MarketPair = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'MarketPair',
  }
)

MarketPair.index({ deletedDate: 1 })
MarketPair.index({ key: 1 })
MarketPair.index({ name: 1 })
MarketPair.index({ status: 1 })
MarketPair.index({ createdDate: 1, updatedDate: 1 })

export const Market = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Market',
  }
)

Market.index({ deletedDate: 1 })
Market.index({ key: 1 })
Market.index({ name: 1 })
Market.index({ status: 1 })
Market.index({ createdDate: 1, updatedDate: 1 })

export const Message = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    content: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    type: { type: String, maxlength: 100 },
    replyToId: { type: String },
    parentId: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Message',
  }
)

Message.index({ deletedDate: 1 })
Message.index({ key: 1 })
Message.index({ name: 1 })
Message.index({ status: 1 })
Message.index({ createdDate: 1, updatedDate: 1 })

export const Offer = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Offer',
  }
)

Offer.index({ deletedDate: 1 })
Offer.index({ key: 1 })
Offer.index({ name: 1 })
Offer.index({ status: 1 })
Offer.index({ createdDate: 1, updatedDate: 1 })

export const Order = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Order',
  }
)

Order.index({ deletedDate: 1 })
Order.index({ key: 1 })
Order.index({ name: 1 })
Order.index({ status: 1 })
Order.index({ createdDate: 1, updatedDate: 1 })

export const Product = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100, required: true },
    shortDescription: { type: String, maxlength: 300 },
    description: { type: String, maxlength: 2000 },
    content: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    communityId: { type: Schema.Types.ObjectId, ref: 'Community' },
    type: { type: String, default: 'game', maxlength: 100 },
    releaseDate: { type: Date },
    tags: { type: [String], default: [] },
    community: { type: Schema.Types.ObjectId, ref: 'Community' },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    leaderboards: [{ type: Schema.Types.ObjectId, ref: 'Leaderboard' }],
    games: [{ type: Schema.Types.ObjectId, ref: '' }],
    productUpdates: [{ type: Schema.Types.ObjectId, ref: 'ProductUpdate' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Product',
  }
)

Product.index({ deletedDate: 1 })
Product.index({ key: 1 })
Product.index({ name: 1 })
Product.index({ status: 1 })
Product.index({ createdDate: 1, updatedDate: 1 })
Product.index({ tags: 'text' }) // Mongoose does not support GIN index directly, using text index instead

export const Project = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    contractStatus: { type: String, default: 'Pending' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Project' },
    realmId: { type: Schema.Types.ObjectId, ref: 'Realm' },
    communityId: { type: Schema.Types.ObjectId, ref: 'Community' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    community: { type: Schema.Types.ObjectId, ref: 'Community' },

    rating: { type: Schema.Types.ObjectId, ref: 'Rating' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Project',
  }
)

export const Rating = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Rating',
  }
)

export const Realm = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Realm',
  }
)

export const Review = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Review',
  }
)

export const Role = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Metaverse',
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    rolesOnProfiles: [{ type: Schema.Types.ObjectId, ref: 'RolesOnProfiles' }],
    permissionsOnRoles: [{ type: Schema.Types.ObjectId, ref: 'PermissionsOnRoles' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Role',
  }
)

export const Server = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Server',
  }
)

export const Session = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    meta: { type: Object, default: {} },
    expired: { type: Date, required: true },
  },
  {
    collection: 'Session',
  }
)

export const Suggestion = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Suggestion',
  }
)

export const Tag = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Tag',
  }
)

export const Tournament = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Tournament',
  }
)

export const Trade = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    content: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    chainId: { type: Schema.Types.ObjectId, ref: 'Chain', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    buyerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Trade',
  }
)

export const ChainTransaction = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    chainId: { type: Schema.Types.ObjectId, ref: 'Chain' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    chain: { type: Schema.Types.ObjectId, ref: 'Chain' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ChainTransaction',
  }
)

export const Vote = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    rating: { type: Schema.Types.ObjectId, ref: 'Rating', onDelete: 'cascade' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Vote',
  }
)

export const Payment = new Schema(
  {
    name: { type: String, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    value: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Payment',
  }
)

export const Referral = new Schema(
  {
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    recipientId: { type: String, required: true },
    senderId: { type: String, required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    recipient: { type: Schema.Types.ObjectId, ref: 'Profile' },
    sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Referral',
  }
)

export const Permission = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    permissionsOnRoles: [{ type: Schema.Types.ObjectId, ref: 'PermissionsOnRoles' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Permission',
  }
)

export const Stat = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    number: { type: Number, default: 0 },
    meta: { type: Object, default: {} },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Stat',
  }
)

export const RecordUpdate = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    objectType: { type: String, required: true, maxlength: 100 },
    objectId: { type: String, required: true },
    actionType: { type: String, required: true, maxlength: 100 },
    reason: { type: String, required: true, maxlength: 100 },
    meta: { type: Object, default: {} },
    recordUpdatesOnForms: [{ type: Schema.Types.ObjectId, ref: 'RecordUpdatesOnForms' }],
    recordUpdatesOnProfiles: [{ type: Schema.Types.ObjectId, ref: 'RecordUpdatesOnProfiles' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'RecordUpdate',
  }
)

export const Form = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    key: { type: String, required: true },
    name: { type: String, required: true },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    formSubmissions: [{ type: Schema.Types.ObjectId, ref: 'FormSubmission' }],
    commentsOnForms: [{ type: Schema.Types.ObjectId, ref: 'CommentsOnForms' }],
    recordUpdatesOnForms: [{ type: Schema.Types.ObjectId, ref: 'RecordUpdatesOnForms' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Form',
  }
)

export const FormSubmission = new Schema(
  {
    meta: { type: Object, default: {} },
    formId: { type: String, required: true },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    form: { type: Schema.Types.ObjectId, ref: 'Form' },
  },
  {
    collection: 'FormSubmission',
  }
)

export const Character = new Schema(
  {
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    key: { type: String, required: true },
    name: { type: String, required: true },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    charactersOnTeams: [{ type: Schema.Types.ObjectId, ref: 'CharactersOnTeams' }],
    npcs: [{ type: Schema.Types.ObjectId, ref: 'Npc' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Character',
  }
)

export const Team = new Schema(
  {
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Team',
  }
)

export const Npc = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    characterRaceId: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    characterRace: { type: Schema.Types.ObjectId, ref: 'CharacterRace' },
    character: { type: Schema.Types.ObjectId, ref: 'Character' },
    characterId: { type: String },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Npc',
  }
)

export const Metaverse = new Schema(
  {
    parentId: { type: String },
    omniverseId: { type: Schema.Types.ObjectId, ref: 'Omniverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    key: { type: String, required: true },
    name: { type: String, required: true, default: '' },
    description: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Metaverse',
  }
)

export const Omniverse = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },
    key: { type: String, required: true },
    name: { type: String, required: true, default: '' },
    description: { type: String },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Omniverse',
  }
)

export const Skill = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Skill',
  }
)

export const SkillMod = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillMod',
  }
)

export const SkillClassification = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillClassification',
  }
)

export const SkillCondition = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillCondition',
  }
)

export const SkillStatusEffect = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillStatusEffect',
  }
)

export const SkillTree = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillTree',
  }
)

export const SkillTreeNode = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SkillTreeNode',
  }
)

export const CharacterAbility = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterAbility',
  }
)

export const CharacterAttribute = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterAttribute',
  }
)

export const CharacterType = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterType',
  }
)

export const ItemAttribute = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemAttribute',
  }
)

export const ItemMaterial = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemMaterial',
  }
)

export const ItemSet = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemSet',
  }
)

export const ItemSlot = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemSlot',
  }
)

export const ItemRarity = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemRarity',
  }
)

export const ItemType = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemType',
  }
)

export const ItemSubType = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemSubType',
  }
)

export const ItemSpecificType = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemSpecificType',
  }
)

export const ItemAffix = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemAffix',
  }
)

export const ItemRecipe = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemRecipe',
  }
)

export const ItemSkin = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ItemSkin',
  }
)

export const Stash = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Stash',
  }
)

export const Biome = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Biome',
  }
)

export const BiomeFeature = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'BiomeFeature',
  }
)

export const Planet = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    solarSystemId: { type: Schema.Types.ObjectId, ref: 'SolarSystem' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Planet',
  }
)

export const SolarSystem = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    galaxyId: { type: Schema.Types.ObjectId, ref: 'Galaxy' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'SolarSystem',
  }
)

export const Galaxy = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    universeId: { type: Schema.Types.ObjectId, ref: 'Universe' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Galaxy',
  }
)

export const Star = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Star',
  }
)

export const Universe = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Universe',
  }
)

export const Quest = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    type: { type: String, default: 'zone' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Quest',
  }
)

export const Area = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    type: { type: String, default: 'zone' },
    landmarks: [{ type: Schema.Types.ObjectId, ref: 'AreaLandmark' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Area',
  }
)

export const AreaType = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'AreaType',
  }
)

export const AreaLandmark = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    areaId: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    area: { type: Schema.Types.ObjectId, ref: 'Area' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'AreaLandmark',
  }
)

export const Act = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Act',
  }
)

export const CharacterClass = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterClass',
  }
)

export const CharacterRace = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    npcs: [{ type: Schema.Types.ObjectId, ref: 'Npc' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterRace',
  }
)

export const CharacterGender = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterGender',
  }
)

export const CharacterPersonality = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterPersonality',
  }
)

export const CharacterTitle = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterTitle',
  }
)

export const AreaNameChoice = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'AreaNameChoice',
  }
)

export const CharacterNameChoice = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'CharacterNameChoice',
  }
)

export const CharacterFaction = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Faction',
  }
)

export const Era = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Era',
  }
)

export const Season = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Season',
  }
)

export const Lore = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    gameId: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Lore',
  }
)

export const Energy = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Energy',
  }
)

export const Guide = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    gameId: { type: String, required: true },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    attachments: { type: Schema.Types.Mixed, default: [] },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Guide',
  }
)

export const Achievement = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    key: { type: String, maxlength: 100 },
    description: { type: String, default: null },
    meta: { type: Schema.Types.Mixed },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', default: null, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', default: null },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile', default: null },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile', default: null },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile', default: null },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Achievement',
  }
)

export const Game = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },

    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Game',
  }
)

export const Validator = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },

    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Validator',
  }
)

export const Poll = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Poll',
  }
)

export const ProductUpdate = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },

    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'ProductUpdate',
  }
)

export const Raffle = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    rewards: [{ type: Schema.Types.ObjectId, ref: 'RaffleReward' }],
    RaffleRequirement: [{ type: Schema.Types.ObjectId, ref: 'RaffleRequirement' }],
    RaffleEntry: [{ type: Schema.Types.ObjectId, ref: 'RaffleEntry' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Raffle',
  }
)

export const RaffleRequirement = new Schema(
  {
    amount: { type: Number, required: true },
    raffleRewardId: { type: String },
    raffleReward: { type: Schema.Types.ObjectId, ref: 'Raffle' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    RaffleRequirementsOnRaffleRewards: [
      { type: Schema.Types.ObjectId, ref: 'RaffleRequirementsOnRaffleRewards' },
    ],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'RaffleRequirement',
  }
)

export const RaffleReward = new Schema(
  {
    raffleId: { type: String },
    raffle: { type: Schema.Types.ObjectId, ref: 'Raffle' },
    winnerId: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    winner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    RaffleRequirementsOnRaffleRewards: [
      { type: Schema.Types.ObjectId, ref: 'RaffleRequirementsOnRaffleRewards' },
    ],
    entries: [{ type: Schema.Types.ObjectId, ref: 'RaffleEntry' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'RaffleReward',
  }
)

export const RaffleEntry = new Schema(
  {
    amount: { type: Number, required: true },
    raffleRewardId: { type: String },
    raffleReward: { type: Schema.Types.ObjectId, ref: 'RaffleReward' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    raffleId: { type: String },
    Raffle: { type: Schema.Types.ObjectId, ref: 'Raffle' },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'RaffleEntry',
  }
)

export const Proposal = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    metaverseId: { type: Schema.Types.ObjectId, ref: 'Metaverse', required: true },

    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Proposal',
  }
)

export const Company = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
    people: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Company',
  }
)

export const Person = new Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    editedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    deletedById: { type: Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    deletedDate: { type: Date },
    meta: { type: Object, default: {} },
    status: { type: String, default: 'Active', enum: ['Paused', 'Pending', 'Active', 'Archived'] },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
    collection: 'Person',
  }
)
