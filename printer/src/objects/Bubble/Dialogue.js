import { resources } from "../../Resource.js"
import { Sprite } from "../../Sprite.js"
import { Vector2 } from "../../Vector2.js"
import { Question } from "../../helpers/QuizzHelper.js"
import { Bubble } from "./Bubble.js"

const READY = "READY"
const LOADING = "LOADING"
const HOLD = "HOLD"

export class Dialogue {
    constructor({
        dialogueJson,
        canvas
    }){
        this.dialogueJson = dialogueJson
        this.status = LOADING
        this.canvas = canvas

        this.bubble = new Bubble({
            text : "",
            canvas: this.canvas,
            title: "",
            strokeStyle: "#B4E1FF",
            fillStyle: "#FFF1D7",
            lineWidth: 5,
            textColor: "#1B4079",
            dialogue: this
          })
    }

    async getjson() {
        this.data = await fetch(this.dialogueJson)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
        
        this.status = HOLD
    }

    async init() {
        await this.getjson()
        this.updateDialogue(this.data.start)
        this.status = READY
    }

    updateDialogue(tag) {
        this.actualDialogue = tag ?? this.actualDialogue
        
        this.updateBubble(0)
    }

    updateBubble(id) {
        this.diagStep = id ?? this.diagStep
        this.bubble.updateText( this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].text ?? "" )
        this.bubble.updateTitle( this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].title ?? this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].personne + ' :' )

        if ( !this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].personne ){
            this.bubble.updateTitle( "Vous" )
            this.bubble.personne = new Sprite({
                resource: resources.images.patrick,
                frameSize: new Vector2(1024,1024)
            })
            this.bubble.update( {
                side: 'left'
            } )
        } else {
            this.bubble.personne = new Sprite({
                resource: resources.images.anne,
                frameSize: new Vector2(1024,1024)
            })
            this.bubble.update( {
                side: 'right'
            } )
        }

        switch (this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].type) {
            case "quizz":
                this.bubble.question = new Question({
                        "id" : 1,
                        "question" : this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].question,
                        "type"  : "Informatique",
                        "réponse" : this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].réponse,
                        "content" : this.data.dialogues[this.actualDialogue].dialogue[this.diagStep].content
                    })
                this.bubble.setupQuizz()
                break;
        
            default:
                this.bubble.state = "text"
                break;
        }
    }

    draw(ctx, x, y) {
        if ( this.status == READY ) {
            this.bubble.draw(ctx, 0, 0)
        }
    }

    nextTalk() {
        if ( this.data.dialogues[this.actualDialogue].dialogue.length <= this.diagStep + 1 ){
            if ( this.data.dialogues[this.actualDialogue].next ) {
                this.actualDialogue = this.data.dialogues[this.actualDialogue].next
                this.updateDialogue()
            }
        } else {
            this.updateBubble(this.diagStep + 1)
        }
    }

}