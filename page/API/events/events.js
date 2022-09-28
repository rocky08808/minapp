Page({
    onLoad() {
        this.titleClick = my.on('titleClick', () => {
            console.log('title clicked')
            my.alert({
                title: 'Dear',
                content: 'You just clicked on the title',
                buttonText: 'I know',
            })
        })
    },
    onUnload(){
        this.titleClick.remove();
    },
})