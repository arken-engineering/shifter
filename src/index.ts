import * as dotenv from 'dotenv'
import { log, isDebug } from '@arken/node/util'
import { subProcesses, catchExceptions } from '@arken/node/util/process'
import { initConfig } from './modules/config'

dotenv.config()

// console.log('env', process.env)

process.env.REACT_APP_PUBLIC_URL = 'https://arken.gg/'

if (isDebug) {
  log('Running DB in DEBUG mode')
}

async function init() {
  catchExceptions(true)

  try {
    const app: any = {}

    app.subProcesses = subProcesses

    app.flags = {}

    if (process.env.RUNE_ENV === 'local') {
      app.moduleConfig = [
        {
          name: 'initConfig',
          instance: initConfig,
          async: false,
          timeout: 0,
        },
      ]
    } else if (process.env.RUNE_ENV === 'production') {
      app.moduleConfig = [
        {
          name: 'initConfig',
          instance: initConfig,
          async: false,
          timeout: 0,
        },
      ]
    }

    app.modules = {}

    for (const module of app.moduleConfig) {
      app.modules[module.name] = module.instance

      if (module.timeout) {
        setTimeout(async () => {
          if (module.async) {
            await module.instance(app)
          } else {
            module.instance(app)
          }
        }, module.timeout)
      } else {
        if (module.async) {
          await module.instance(app)
        } else {
          module.instance(app)
        }
      }
    }
  } catch (e) {
    log('Error', e)
  }
}

init()

// Force restart after an hour
// setTimeout(() => {
//   process.exit(1)
// }, 1 * 60 * 60 * 1000)
