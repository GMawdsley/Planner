import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'

class AVCalendar extends Component{
    constructor(props){
        super(props);

        this.state = {
            viewModel: {},
            resource: {}
        }
    }


    componentDidMount () {
        const _self = this;
        fetch('https://hack-day-224708.appspot.com/available-resources')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              _self.setState({resource: data})
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

    renderCal() {

        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week, false, false, {
            startResizable: false,
            endResizable: false,
            movable: false,
            creatable: false,
        });

        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(this.state.resource);
        schedulerData.setEvents([]);

        return (<Scheduler schedulerData={schedulerData}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
        /> )
    }

    render(){
        return (
            <div>
                <h2 className="sub-heading">Available Resources</h2>
                {this.state.resource.length && this.renderCal()}
            </div>
    )};

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents([]);
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
}

export default withDragDropContext(AVCalendar)
