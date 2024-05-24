import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

//Criar uma instancia de Engine, que representa o jogo
const game = new Engine ({
	width: 800, height: 600
})

//Criar barra do player
const barra = new Actor ({
	x: 150, y: game.drawHeight - 40,
	width: 200, height: 20, color: Color.Chartreuse
})

//
barra.body.collisionType = CollisionType.Fixed

//INsere o actor barra no game
game.add(barra)

//Movimentar a barra de acordo com a posicao do mouse
game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x
})

//Criar actor bolinha
const bolinha = new Actor ({
	x: 100, y: 300,
	radius: 10, color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

//Criar movimentacao da bolinha
const velocidadeBolinha = vec(100, 100)
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

//Fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
	//Se a bolinha colidir com o lado esquerdo
	if(bolinha.pos.x < bolinha.width/2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	//Se a bolinha colidir com o lado direito
	if(bolinha.pos.x + bolinha.width/2 > game.drawWidth) {
        bolinha.vel.x = velocidadeBolinha.x * -1
	}

	//Se a bolinha colidir com a parte superior
	if(bolinha.pos.y < bolinha.height/2) {
        bolinha.vel.y = velocidadeBolinha.y
	}

	/*Se a bolinha colidir com a parte inferior
	if(bolinha.pos.y + bolinha.height/2 > game.drawHeight) {
        bolinha.vel.y = velocidadeBolinha.y * -1
	}*/

})

//Insere a bolinha no game
game.add(bolinha)

//Criar os blocos
const padding = 20
const xoffset = 65
const yoffset = 20
const colunas = 5
const linhas = 3
const corBloco = [
	Color.Violet, Color.Orange, Color.Yellow
]
const alturaBloco = 30
const larguraBloco = (game.drawWidth/colunas) - padding - (padding/colunas)

const listaBlocos: Actor[] = []

//Inicia o game
game.start()