import GameScene from "./GameScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    private static _ref: Main;
    public static finishied: boolean = false;
    private static crached: boolean = false;
    static totalTickets: number = 0;
    static record: number = 0;
    static currentTickets: number = 0;
    static currentPlayer: string = 'boy';
    public static colides: number = 0;
    private static ticketsUrl: string;
    private static token: string;
    public static handlers: any[] = [];    

    onLoad() {
        Main._ref = this;
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
        Main.record = tickets ? parseInt(tickets) : 0;
        Main.playGame('Prepare-se!');
    }

    private static playGame(message) {
        Main.currentTickets = 0;
        cc.director.loadScene('GameScene', () => {
            cc.director.pause();
            if (!Main.token) {
                Main.finishied = true;
                GameScene.showFeedback("Erro ao inicializar jogo!");
            } else {
                if (GameScene.isLandsCape()) {
                    GameScene.showFeedback(message, false, true);
                }
            }
        });
    }

    public static init() {        
        GameScene.hideFeedback();
        GameScene._ref.sndTrilha.play();
        GameScene._ref.sndWalking.play();
        cc.director.resume();
    }

    public static restartGame() {
        if (!Main.finishied) {
            GameScene.hideFeedback();
            Main.playGame('O jogo re-iniciará em 4 segundos.');
        }
    }

    public static reInit() {
        if (Main.finishied) {
            setTimeout(() => {                
                Main.colides = 0;
                Main.currentTickets = 0;
                Main.finishied = false;                
                Main.record = Main.totalTickets > Main.record ? Main.totalTickets : Main.record;
                GameScene.hideFeedback();
                cc.director.loadScene('GameScene', () => {
                    GameScene._ref.sndTrilha.play();
                    GameScene._ref.sndWalking.play();
                });
            }, 30);
        }
    }

    public static onFallDown() {
        Main.colides = 3;
        Main.cracheIt();
    }

    public static onColide() {
        Main.colides++;
        Main.cracheIt();
    }
    
    private static cracheIt() {
        
        Main.crached = true;
        Main.finishied = Main.colides >= 3;
        GameScene._ref.sndCollide.play();
        if (Main.finishied) {            
            Main.finishGame('Tente de novo pra ultrapassar seu recorde.');
            setTimeout(() => {
                cc.director.pause();
            }, 30);
            Main.registerTickets(this.currentTickets);
        }
    }

    public static onNewTicket() {
        GameScene._ref.sndFinal.play();
        Main.currentTickets++;
        if (Main.currentTickets >= Main.totalTickets) {
            Main.totalTickets = Main.currentTickets;
        }
        if (Main.currentTickets >= 20) {
            Main.finishied = true;
            Main.finishGame('Parabéns! Você pegou todos os cupons.');
            Main.registerTickets(this.totalTickets);
            setTimeout(() => {
                cc.director.pause();
            }, 30);
        }
    }

    private static finishGame(message) {
        GameScene.showFeedback(message, true);
        if (GameScene._ref.sndTrilha)
            GameScene._ref.sndTrilha.stop();
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
