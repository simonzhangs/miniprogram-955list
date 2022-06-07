Page({
    data: {
        visible: true,
        marquee1: {
            speed: 80,
            loop: -1,
            delay: 0,
        },
        marquee2: {
            speed: 60,
            loop: -1,
            delay: 0,
        },
    },
    onReady() {
    },
    click(e) {
        const { trigger } = e.detail;
        if (trigger === 'prefix-icon') {
            console.log('click prefix-icon text');
        }
        else if (trigger === 'content') {
            console.log('click content text');
        }
        else if (trigger === 'extra') {
            console.log('click extra text');
        }
        else if (trigger === 'suffix-icon') {
            console.log('click suffix-icon text');
        }
    },
    clickDetail() {
        console.log('click detail text');
    },
});
