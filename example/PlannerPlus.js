import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'
import Readonly from './Readonly'

class PlannerPlus extends Component{
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
                    console.log(project.id);

                    if (project.id === 20002) {
                        console.log('last piss');
                    }

                })
                .catch(error => console.error('Error:', error));

            });
        })
        .catch(error => console.error('Error:', error));







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
            viewModel: data,
            plannerData: DemoData
        }
    }

    renderScheduler(schedulerData) {
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

}

export default withDragDropContext(PlannerPlus)
