import { ghostElements } from '@/src/_maps/ghostElements'
import { ghostMap } from '@/src/_maps/ghostMap'
import { GHOST_ELEMENT_ID } from '@/src/constants/ghostId'
import type {
  CreateGhostLayer,
  DuplicateLayer,
  FreezeLayer,
  GetLayer,
  LoopLayer,
  MaintenceLayer,
  RemoveLayer,
  RenderLayer,
  SortLayer,
  VirtualApi,
  CacheRules,
  CompileLayer,
  GhostElement,
  LoopConfig,
  CreateGhostProps,
  GhostElements,
} from '@/src/types'
import { deepClone, generateId, logWarning } from '@/src/utils'

export const ActionsVirtual = (rules: CacheRules): VirtualApi => {
  /**
   * Membuat elemen ghost yang akan digunakan dalam virtual layer.
   * Fungsi ini memverifikasi tag HTML yang valid dan menghasilkan ID unik untuk setiap ghost.
   *
   * @param tag - Nama tag HTML yang didukung, seperti 'ul', 'ol', dll.
   * @param props - Objek properti tambahan seperti `className`, `style`, atau atribut lain yang ingin disisipkan ke elemen.
   * @returns Objek ghost element dengan struktur data siap digunakan dalam virtual layer.
   */
  const createGhost: CreateGhostLayer = (
    options: CreateGhostProps
  ): GhostElements => {
    try {
      if (!options || !Array.isArray(options.entries)) return []

      let ghost: GhostElement = {} as GhostElement

      const entries = options.entries.map((element) => {
        const isValid = ghostElements.includes(element.tag)

        if (!isValid) {
          logWarning(`Tag <${element.tag}> is not supported.`)
        }

        ghost = {
          name: element.name,
          tag: generateId(element.tag),
          children: element.children || [],
        }

        return ghost
      })

      ghostMap.set(GHOST_ELEMENT_ID + ghost.tag, [ghost])

      if (options.autoCompile) {
        compile(ghost)
      }

      return entries
    } catch (error) {
      if (error instanceof Error) {
        logWarning(`Failed to create ghost: ${error.message}`)
      }
      return []
    }
  }

  /** Compile */
  const compile: CompileLayer = (ghost: GhostElement) => {
    if (!ghost || !ghost.name || !ghost.tag) {
      logWarning('Invalid ghost element for compilation.')
      return
    }

    if (rules?.components) {
      rules.components.push(deepClone(ghost))
    }
  }

  const duplicate: DuplicateLayer = () => {
    // Placeholder
  }

  const freeze: FreezeLayer = () => {
    // Placeholder
  }

  const get: GetLayer = () => {
    // Placeholder
  }

  const loop: LoopLayer = (id: string, config: LoopConfig): Children[] => {
    const isReadyGhost = ghostMap.get(GHOST_ELEMENT_ID + id)
    try {
      if (!isReadyGhost) {
        logWarning(`Ghost element with ${id} not found.`)
        return []
      }

      const ghostCached: GhostElement = ghostMap.get(GHOST_ELEMENT_ID + id)

      if (!Array.isArray(ghostCached.children)) {
        ghostCached.children = []
      }

      if (config?.count && config.count > 0) {
        for (let i = 0; i < config.count; i++) {
          ghostCached.children.push(deepClone(config.template))
        }
      }

      ghostMap.set(GHOST_ELEMENT_ID + id, ghostCached)

      return ghostCached.children
    } catch (error) {
      return []
    }
  }

  const maintence: MaintenceLayer = false

  const remove: RemoveLayer = () => {
    // Placeholder
  }

  const render: RenderLayer = () => {}

  const sort: SortLayer = (id, cb) => {
    // Placeholder untuk sorting manual
  }

  return {
    createGhost,
    compile,
    duplicate,
    freeze,
    get,
    loop,
    maintence,
    remove,
    render,
    sort,
  }
}
