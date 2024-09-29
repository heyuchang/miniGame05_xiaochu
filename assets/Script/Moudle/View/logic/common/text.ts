const {ccclass, property} = cc._decorator;

@ccclass
export default class Text extends cc.Component {

    delay: number = 0

    start() {
        cc.tween(this.node)
            .delay(this.delay)
            .to(2, {opacity: 0})
            .call(() => {
                this.node.destroy()
            })
            .start()
    }
}
