/**
 * Ces trois fonctions facilitent la gestion du clavier
 */
// Stocke les `keyCode` des touches actuellement enfoncées
let downKeys = []

// Lors d'une pression, ajoute le `keyCode` à la liste
document.addEventListener("keydown", e => {
    e.preventDefault()

    if (!e.repeat)
        downKeys.push(e.code)
})

// Lors du relâchement de pression, retire le keyCode de la liste
document.addEventListener("keyup", e => {
    e.preventDefault()

    let downKeysIndex = downKeys.findIndex(keyCode => keyCode === e.code)
    downKeys.splice(downKeysIndex, 1)
})

// Vide la liste lorsque la page n'est plus affichée
window.addEventListener("blur", e => downKeys = [])

/**
 * Indique si une touche est enfoncée ou non
 * @param searchedKeyCode
 * @returns {boolean}
 */
const isKeyDown = searchedKeyCode => downKeys.findIndex(keyCode => keyCode === searchedKeyCode) !== -1

/**
 * Assigne une fonction à l'enfoncement d'une touche,
 * Retourne une fonction de désactivation de l'événement
 * @param keyCode
 * @param callback
 * @returns {function(): void}
 */
const keyDown = (keyCode, callback) => {
    let cb = e => {
        e.preventDefault()

        if (e.code === keyCode && !e.repeat) callback(e)
    }
    document.addEventListener("keydown", cb)

    return () => document.removeEventListener("keydown", cb)
}

/**
 * Assigne une fonction au relâchement d'une touche,
 * Retourne une fonction de désactivation de l'événement
 * @param keyCode
 * @param callback
 * @returns {function(): void}
 */
const keyUp = (keyCode, callback) => {
    let cb = e => {
        e.preventDefault()

        if (e.code === keyCode) callback(e)
    }
    document.addEventListener("keyup", cb)

    return () => document.removeEventListener("keydown", cb)
}

/**
 * Raccourci pour assigner deux fonctions à l'enfoncement et relâchement d'une touche
 * Retourne un objet { down, up } contenant les fonctions de désactivation des événements
 * @param keyCode
 * @param callbackDown
 * @param callbackUp
 * @returns {{up: (function(): void), down: (function(): void)}}
 */
const keyDownUp = (keyCode, callbackDown, callbackUp) => ({
    down: keyDown(keyCode, callbackDown),
    up: keyUp(keyCode, callbackUp)
})
