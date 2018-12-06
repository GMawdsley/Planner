import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes, DemoData} from '../src/index'
import withDragDropContext from './withDnDContext'

class AVCalendar extends Component{
    constructor(props){
        super(props);

        this.schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week, false, false, {
            startResizable: false,
            endResizable: false,
            movable: false,
            creatable: false,
        });

        this.schedulerData.localeMoment.locale('en');
        this.schedulerData.setResources([]);
        this.schedulerData.setEvents([]);

        this.state = {
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

    renderCal(resource) {

        this.schedulerData.setResources(resource);
        this.schedulerData.setEvents([]);

        return (<Scheduler schedulerData={this.schedulerData}
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
                <h1>Available Resources</h1>
                {this.state.resource.length && this.renderCal(this.state.resource)}
            </div>
    )};

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents([]);
        this.setState({
            resource: this.state.resource
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents([]);
        this.setState({
            resource: this.state.resource
        })
    }

    onViewChange = (schedulerData, view) => {

        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents([]);
        this.setState({
            resource: this.state.resource
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents([]);
        this.setState({
            resource: this.state.resource
        })
    }
}

export default withDragDropContext(AVCalendar)
