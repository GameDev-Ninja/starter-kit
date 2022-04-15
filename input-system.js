/**
 * Ces trois fonctions facilitent la gestion du clavier
 */
// Stock les `keyCode` des touches actuellement enfoncées
let downKeys = []

// Lors d'une pression, ajoute le `keyCode` à la liste
document.addEventListener("keydown", e => {
    let downKeysIndex = downKeys.findIndex(keyCode => keyCode === e.code)
    if (downKeysIndex !== -1) return

    downKeys.push(e.code)
})

// Lors du relâchement de pression, retire le keyCode de la liste
document.addEventListener("keyup", e => {
    let downKeysIndex = downKeys.findIndex(keyCode => keyCode === e.code)
    downKeys.splice(downKeysIndex, 1)
})

// Vide la liste lorsque la page n'est plus affichée
window.addEventListener("blur", e => downKeys = [])

// Indique si une touche est enfoncée ou non
const isKeyDown = searchedCode => downKeys.findIndex(keyCode => keyCode === searchedCode) !== -1

// Assigne une fonction à la pression d'une touche
const keyDown = (keyCode, callback) =>
    document.addEventListener("keydown", e => {
        if (e.code === keyCode) callback(e)
    })

// Assigne une fonction au relâchement d'une touche
const keyUp = (keyCode, callback) =>
    document.addEventListener("keyup", e => {
        if (e.code === keyCode) callback(e)
    })

// Raccourci pour assigner deux fonctions à la pression/relâchement d'une touche
const keyUpDown = (keyCode, callbackDown, callbackUp) => {
    keyDown(keyCode, callbackDown)
    keyUp(keyCode, callbackUp)
}