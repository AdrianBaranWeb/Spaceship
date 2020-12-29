export class Enemy{
    constructor(container, enemyClass, speed, lives = 1){
        this.container = container
        this.enemyClass = enemyClass
        this.speed = speed
        this.element = document.createElement('div')
        this.interval = null
        this.lives = lives
    }

    init(){
        this.#setEnemy()
        this.#updatePosition()
    }

    #setEnemy(){
        this.container.appendChild(this.element)
        this.element.classList.add(this.enemyClass)
        this.element.style.left = `${this.#randomPosition()}px`
        this.element.style.top = 0
    }

    #randomPosition(){
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth))
    }

    #updatePosition(){
        this.interval = setInterval(() => this.#setNewPosition(), this.speed)
    }

    #setNewPosition(){
        this.element.style.top = `${this.element.offsetTop + 1}px`
    }

    remove(){
        clearInterval(this.interval)
        this.element.remove()
    }
}