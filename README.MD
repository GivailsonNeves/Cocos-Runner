# Runner Jogo Plataforma

Jogo 2D plataforma desenvolvido em Cocos 2d Com TypeScript baseado na Framework de jogos Cocos 2dx.

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