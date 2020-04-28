import GameScene from "./GameScene";

const { ccclass, property } = cc._decorator;

cc.loader.loadRes('red_lollipop.png', cc.SpriteFrame);
cc.loader.loadRes('red_lollipop.png', cc.SpriteFrame);
cc.loader.loadRes('ticket.png', cc.SpriteFrame);

@ccclass
export default class Main extends cc.Component {
    
    private static finishied: boolean = false;
    private static crached: boolean = false;
    static totalTickets: number = 0;
    static currentTickets: number = 0;
    static currentPlayer: string = 'boy';
    private static colides: number = 0;
    private static ticketsUrl: string;
    private static token: string;
    
    onLoad() {
        Main.ticketsUrl = window['TICKETS_URL'] ? window['TICKETS_URL'] : "https://aniversario-api-hml.azurewebsites.net/api/acao";
        this.getParameters();
        cc.director.getPhysicsManager().enabled = true;        
    }

    getParameters() {
        const plr = this.getParameterByName('player');
        const tickets = this.getParameterByName('tickets');
        Main.token = this.getParameterByName("token");        
        Main.currentPlayer = plr ? plr : 'boy';
        Main.totalTickets = tickets ? parseInt(tickets) : 0;
        Main.playGame();
    }

    private static playGame() {
        Main.currentTickets = 0;
        cc.director.loadScene('GameScene', () => {            
            if(!Main.token) {
                Main.finishied = true;
                cc.director.pause();
                GameScene.showFeedback("Erro ao inicializar jogo!");
            }
        });
    }

    public static restartGame() {
        if (!Main.finishied && Main.crached) {
            GameScene.hideFeedback();            
            Main.playGame();
        }
    }

    public static onFallDown() {
        Main.cracheIt();
    }

    public static onColide() {
        Main.cracheIt();
    }

    private static cracheIt() {
        Main.crached = true;
        Main.colides++;
        Main.finishied = Main.colides >= 3;
        if (Main.finishied) {
            GameScene.showFeedback('Que pena, não foi dessa vez!!');
        } else {
            GameScene.showFeedback('Uhhh!!!! Tente novamente!');
        }
        if (this.currentTickets >= this.totalTickets) {
            Main.registerTickets(this.currentTickets);
        }
        cc.director.pause();
    }

    public static onNewTicket() {
        Main.currentTickets++;
        if (Main.currentTickets > Main.totalTickets) {
            Main.totalTickets = Main.currentTickets;
        }
        if (Main.totalTickets >= 20) {
            cc.director.pause();
            Main.finishied = true;
            GameScene.showFeedback('Parabéns você capturou todos os vinte cupons!');
            Main.registerTickets(this.totalTickets);
        }
    }

    private getParameterByName(name, url = null): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    private static registerTickets(totalTickets: number) {
        let request = cc.loader.getXMLHttpRequest();
        request.open("POST", Main.ticketsUrl, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Authorization", "Bearer " + Main.token);
        request.send(JSON.stringify({
            "id": "jogada-game",
            "cupons": totalTickets
        }))
    }

}
