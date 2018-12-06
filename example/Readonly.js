import React, {Component} from 'react'
import Header from './Header'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'
import AVCalendar from './AVCalendar'

class Readonly extends Component{
    constructor(props){
        super(props);

        let demoData = {
            projects: []
        };

        let projectCount;

        fetch('https://hack-day-224708.appspot.com/projects', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
        .then(response => {
            projectCount = response.length;
            response.map(project => {


                demoData.projects[project.id] = project;




                fetch('https://hack-day-224708.appspot.com/project-resources?projectId=' + project.id, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    }).then(res => res.json())
                .then(response => {

                    response.map(item => {
                        item.resourceId = item.resource.id;
                    });

                    demoData.projects[project.id].events = response;
                    console.log(demoData);

                    if (project.id === 20002) {

                        
                        const data = demoData.projects.map(project => {
                            let schedulerData = new SchedulerData('2018-12-09', ViewTypes.Month, false, false, {
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
                            schedulerData.projectName = project.name;

                            return schedulerData;
                        })
                
                        this.setState ({
                            viewModel: data,
                            plannerData: demoData
                        });

                    }

                })
                .catch(error => console.error('Error:', error));

            });
        })
        .catch(error => console.error('Error:', error));

        this.state = {
            viewModel: {},
            plannerData: {}
        };
        
    }

    renderScheduler(schedulerData) {
        return (<div className="header__inner">
                    <h2 className="sub-heading">{schedulerData.projectName}</h2>
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
                <Header />
                {this.state.viewModel && this.state.viewModel.length && this.state.viewModel.map(schedulerData => 
                    this.renderScheduler(schedulerData)
                )}
                <AVCalendar />
            </div>
    )};

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        const filterData = this.state.plannerData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        const filterData = this.state.plannerData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {

        const filterData = this.state.plannerData.projects.filter(data => data.id === schedulerData.projectId);
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(filterData[0].events);
        this.setState({
            ...this.state.viewModel,
            schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        const filterData = this.state.plannerData.projects.filter(data => data.id === schedulerData.projectId);
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

export default withDragDropContext(Readonly)
