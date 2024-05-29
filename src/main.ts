import { Actor, CollisionType, Color, Engine, Font, FontUnit, Label, Loader, Sound, vec } from "excalibur"
const morte = new Sound('/sounds/roblox-death-sound-effect.mp3')
const som = new Loader([morte])
const pickup = new Sound('/sounds/pickup.wav')
const som2 = new Loader([pickup])
const aplausos = new Sound('/sounds/applause-180037.mp3')
const som3 = new Loader([aplausos])
const ping = new Sound('/sounds/beeep-43965.mp3')
const som4 = new Loader([ping])

//Criar uma instancia de Engine, que representa o jogo
const game = new Engine({
	width: 800, height: 600
})

//Criar barra do player
const barra = new Actor({
	x: 150, y: game.drawHeight - 40,
	width: 200, height: 20, color: Color.Chartreuse, name: "barraJogador"
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
const bolinha = new Actor({
	x: 100, y: 300,
	radius: 10, color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

//Criar movimentacao da bolinha
const velocidadeBolinha = vec(200, 200)
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

//Fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
	//Se a bolinha colidir com o lado esquerdo
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	//Se a bolinha colidir com o lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = velocidadeBolinha.x * -1
	}

	//Se a bolinha colidir com a parte superior
	if (bolinha.pos.y < bolinha.height / 2) {
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
	Color.Red, Color.Orange, Color.Yellow
]
const alturaBloco = 30
const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)

const listaBlocos: Actor[] = []

//renderizacao dos bloquinhos
//renderiza 3 linhas
for (let j = 0; j < linhas; j++) {



	//renderiza 5 bloquinhos
	for (let i = 0; i < colunas; i++) {
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (larguraBloco + padding) + padding, y: yoffset + j * (alturaBloco + padding) + padding,
				height: alturaBloco, width: larguraBloco, color: corBloco[j]
			})
		)
	}
}

listaBlocos.forEach(bloco => {
	//Define o tipo de colisão dos blocos
	bloco.body.collisionType = CollisionType.Active

	//Adiciona os blocos no jogo
	game.add(bloco)

})

let pontos = 0

const textoPontos = new Label({
	text: pontos.toString(),
	font: new Font({
		size: 40,
		color: Color.White, strokeColor: Color.Black,
		unit: FontUnit.Px
	}),
	pos: vec(600, 500)
})

game.add(textoPontos)

let colidindo: boolean = false

bolinha.on("collisionstart", (event) => {
	console.log("colidiu com", event.other.name)

	if (listaBlocos.includes(event.other)) {
		event.other.kill()
		pickup.play(0.5)

		pontos++

		textoPontos.text = pontos.toString()

		console.log(pontos)

		if(pontos >= 15) {
			aplausos.play(1)
			alert("Voce venceu!!!!!")
			window.location.reload()
		}
		
	}

	let interseccao = event.contact.mtv.normalize()

	if (colidindo == false) {
		colidindo = true
        ping.play(1)
		if (Math.abs(interseccao.x) > Math.abs(interseccao.y)) {
			bolinha.vel.x *= -1
		}
		else {
			bolinha.vel.y *= -1
		}
	}
})

bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on("exitviewport", () => {
	morte.play(1)
	alert("morreu")
	window.location.reload()
})

//Inicia o game
await game.start(som),

game.start(som2),

game.start(som3), 

game.start(som4)