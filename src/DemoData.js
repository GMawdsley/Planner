



const DemoData = {
    projects : [
         {
            id: 1,
            name: "toom",
            events: [
                {
                    id: 1,
                    start: '2017-12-18 09:30:00',
                    end: '2017-12-19 23:30:00',
                    resourceId: 'r1',
                    title: 'I am finished',
                    bgColor: '#D9D9D9',
                    showPopover: false,
                    resource: {
                        id: 'r1',
                        name: 'Resource1',
                    }
                },
                {
                    id: 2,
                    start: '2017-12-18 12:30:00',
                    end: '2017-12-26 23:30:00',
                    resourceId: 'r2',
                    title: 'I am not resizable',
                    resizable: false,
                    resource: {
                        id: 'r2',
                        name: 'Resource2',
                    }
                },
                {
                    id: 3,
                    start: '2017-12-18 12:30:00',
                    end: '2017-12-26 23:30:00',
                    resourceId: 'r3',
                    title: 'I am not resizable',
                    resizable: false,
                    resource: {
                        id: 'r3',
                        name: 'Resource3',
                    }
                }
            ]
        },
        {
            id: 2,
            name: "Metro",
            events: [
                {
                    id: 1,
                    start: '2017-12-18 09:30:00',
                    end: '2017-12-19 23:30:00',
                    resourceId: 'r1',
                    title: 'I am finished',
                    bgColor: '#D9D9D9',
                    showPopover: false,
                    resource: {
                        id: 'r1',
                        name: 'Resource1',
                    }
                }
            ]
        },
        {
            id: 3,
            name: "JTF",
            events: [
                {
                    id: 1,
                    start: '2017-12-18 09:30:00',
                    end: '2017-12-19 23:30:00',
                    resourceId: 'r1',
                    title: 'I am finished',
                    bgColor: '#D9D9D9',
                    showPopover: false,
                    resource: {
                        id: 'r1',
                        name: 'Resource1',
                    }
                },
                {
                    id: 2,
                    start: '2017-12-18 12:30:00',
                    end: '2017-12-26 23:30:00',
                    resourceId: 'r2',
                    title: 'I am not resizable',
                    resizable: false,
                    resource: {
                        id: 'r2',
                        name: 'Resource2',
                    }
                }
            ]
        }
    ]
}

export default DemoData
