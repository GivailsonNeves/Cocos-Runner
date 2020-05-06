# Runner Jogo Plataforma

Jogo desenvolvido em Cocos2d-x e TypeScript utilizando na Cocos Creator.

## Sumário

- [Requisitos para execução do projeot](#game-demo)
- [Fluxo do jogo](#fluxo-do-jogo)
- [Configurações do jogo](#configurações-do-jogo)
- [Comandos do jogo](#comandos-do-jogo)
- [Game Demo](#game-demo)


## Requisitos para execução do projeto:

+ [Framework Cocos2d-x v.233](https://www.cocos.com/en/cocos2dx)
+ [Cocos Creator](https://www.cocos.com/en/creator)
+ Editor TypeScript ([Vs Code](https://code.visualstudio.com/) recomendado)

## Fluxo do jogo

+ O jogador irá correr até coletar 10 tickets ou o fim das vidas.
+ As vidas acabam de imediato em queda, ou uma por uma colidindo com o que não for ticket.
+ O total de vidas é 3

## Configurações do jogo

### Por query string:

```
http://[[suahospedagem.com]]/?token=@%$$#&player=girl&tickets=0
```

onde:
+ token: se não for passado aparece mensagem de erro, será enviado no Header (padrão Bearer) do envio de pontos.
+ player: se passado **girl** aparece a menina, senão já vem o menino.
+ tickets: a quantidade de cupons que o usuário já tenha.

### No arquivo html de hospedagem
Deve-se passar o endpoint completo para envio de pontuação
```html
<script charset="utf-8">
  window.TICKETS_URL = "http://www.google.com.br"
</script>
```

## Comandos do jogo

Uma vez que o jogo iniciou os comandos para saltar são:
- Touch no celular
- Click esquerdo do mouse
- Barra de espaço
- Seta para cima

## Game Demo

![Jogo rodando](https://github.com/GivailsonNeves/Cocos-Runner/blob/master/running.gif?raw=true)


## Sumário

- [Requisitos para execução do projeot](#game-demo)
- [Fluxo do jogo](#fluxo-do-jogo)
- [Configurações do jogo](#configurações-do-jogo)
- [Comandos do jogo](#comandos-do-jogo)
- [Game Demo](#game-demo)

>Proibida a copia integral do código, ao menos os assets devem ser mudados.