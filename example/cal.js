import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'

class ReadonlyCal extends Component{
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
            schedulerData.projectId = project.name;

            return schedulerData;
        })

        this.state = {
            viewModel: data
        }
    }

    renderScheduler(schedulerData) {
        console.log(schedulerData);
        return (<div>
                    <h2></h2>
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
        const filterData = DemoData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        const filterData = DemoData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {

        const filterData = DemoData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        const filterData = DemoData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
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

export default withDragDropContext(ReadonlyCal)
