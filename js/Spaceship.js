import {Missile} from './Missile.js'

export class Spaceship{

    missiles = []
    #modifire = 10
    #leftArrow = false
    #rightArrow = false
    #spaceWidth = null
    #shooter = 0
    #shootInterval = null
    
    constructor(element, container){
        this.element = element
        this.container = container
        this.#spaceWidth = this.element.offsetWidth
    }

    
    init(){
        this.#setPosition()
        this.#eventListeners()
        this.#gameLoop()
    }

    #setPosition(){
        this.element.style.bottom = 0
        this.element.style.left = `${window.innerWidth / 2 - this.#getPosition()}px`
    }

    #getPosition(){
        return this.element.offsetLeft + this.#spaceWidth / 2 
    }

    #eventListeners() {
        window.addEventListener('keydown', ({keyCode}) => {
            switch(keyCode){
                case 32:
                    if(this.#shooter < 1){
                        this.#shoot()
                        this.#shootInterval = setInterval(() => this.#shoot(), 1000)
                        this.#shooter++
                    } 
                break
                case 37:
                    this.#leftArrow = true
                break
                case 39:
                    this.#rightArrow = true
                break
            }
        })

        window.addEventListener('keyup', ({keyCode}) => {
            switch(keyCode){
                case 32:
                    this.#shooter = 0
                    clearInterval(this.#shootInterval)
                break
                case 37:
                    this.#leftArrow = false
                break
                case 39:
                    this.#rightArrow = false
                break
            }
        })
    }

    #gameLoop = () => {
        this.#whatKey()
        requestAnimationFrame(this.#gameLoop)
    }

    #whatKey(){
        if(this.#leftArrow && this.#getPosition() > 12) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifire}px`
        }

        if(this.#rightArrow && this.#getPosition() < window.innerWidth - 12) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifire}px`
        }
    }

    #shoot(){ 
        const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.container)
        missile.init()
        this.missiles.push(missile)
    }
}