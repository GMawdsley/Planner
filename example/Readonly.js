import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'

class Readonly extends Component{
    constructor(props){
        super(props);

        const data = DemoData.projects.map(project => {
            let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week, false, false, {
                startResizable: false,
                endResizable: false,
                movable: false,
                creatable: false,
            });

            const resourceData = project.events.map((item) => item.resource)
            schedulerData.localeMoment.locale('en');
            schedulerData.setResources(resourceData);
            schedulerData.setEvents(project.events);
            schedulerData.projectId = project.id;
            
            return schedulerData;
        })

        this.state = {
            viewModel: data
        }
    }

    renderScheduler(schedulerData) {
        console.log(schedulerData);
        return (<div>
                    <Scheduler schedulerData={schedulerData}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                        eventItemClick={this.eventClicked}
                        viewEventClick={this.ops1}
                        viewEventText="Ops 1"
                        viewEvent2Text="Ops 2"
                        viewEvent2Click={this.ops2}
                    /> 
                </div>
            )
    }

    render(){
        //const {viewModel} = this.state;
        return (
            <div>
                <h1>Planner Plus</h1>
                {this.state.viewModel.map(schedulerData => 
                    this.renderScheduler(schedulerData)
                )}
            </div>
    )};

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        console.log(schedulerData.projectId);

         const newData = { ...this.state.viewModel }
         //newData.forEach(element => {
             
         //});
         //const filterData = newData.map(data => date.projectId === schedulerData.projectId);

        console.log(newData);

        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(eventData);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };
}

export default withDragDropContext(Readonly)
