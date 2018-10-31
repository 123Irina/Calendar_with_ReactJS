const place = document.getElementById('react');

// Calendar

class CalendarAll extends React.Component {
    MonthNow (year=new Date().getFullYear(), month=new Date().getMonth()) {
        let options = {month: 'long'},
            dateNow = new Date(year, month);
        return {
            date: dateNow,
            name: dateNow.toLocaleString("ru", options) + ' ' + dateNow.getFullYear(),
            month: dateNow.getMonth(),
            year: dateNow.getFullYear()
        }
    };
    prevClick (){
        var monthSpan = document.querySelector('.calendarHead span.month'),
            MonthNow = monthSpan.dataset.month * 1,
            YearNow = monthSpan.dataset.year * 1,
            newMonth, newYear,
            monthes=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        if (MonthNow === 0) {
            newMonth = 11;
            newYear = YearNow - 1
        } else {
            newMonth = MonthNow - 1;
            newYear = YearNow
        }
        Calendar(newYear, newMonth);
        monthSpan.dataset.month=newMonth;
        monthSpan.dataset.year=newYear;
        monthSpan.innerHTML = monthes[newMonth] + newYear;
    };
    nextClick (){
        var monthSpan = document.querySelector('.calendarHead span.month'),
            MonthNow = monthSpan.dataset.month * 1,
            YearNow = monthSpan.dataset.year * 1,
            newMonth, newYear,
            monthes=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        if (MonthNow < 11) {
            newMonth = MonthNow + 1;
            newYear = YearNow
        } else {
            newMonth = 0;
            newYear = YearNow + 1
        }
        Calendar(newYear, newMonth);
        monthSpan.dataset.month=newMonth;
        monthSpan.dataset.year=newYear;
        monthSpan.innerHTML = monthes[newMonth] + newYear;
    };
    render () {
        return (
            <div className='AllCalenar'>
                <div className="calendarHead">
                    <h1>Календарь</h1>
                    <div className="today inline-block">СЕГОДНЯ</div>
                    <div className='inline-block'>
                        <button className="prev" onClick={this.prevClick}>‹</button>
                        <button className="next" onClick={this.nextClick}>›</button>
                        <span data-month={this.MonthNow().month}
                              data-year={this.MonthNow().year}
                              className="month">{this.MonthNow().name}</span>
                    </div>
                    <div className='searchBlock'>
                        <button id='searchBtn'><i className="fas fa-search"/></button>
                        <input id='searchValue' type='text' placeholder='Событие, дата или участник'/>
                    </div>
                </div>
                <HtmlForCalendar/>
                <CalendarBody />
            </div>
        );
    }
}

class TdDay extends React.Component {
    render () {
        return (
            <div>{this.props.text}</div>
        )
    }
}

class HtmlForCalendar extends React.Component {
    render () {
        return (
            <div className="weekDay">
                <TdDay text="Пн" /><TdDay text="Вт" /><TdDay text="Ср" /><TdDay text="Чт" />
                <TdDay text="Пт" /><TdDay text="Сб" /><TdDay text="Вс" />
            </div>
        )
    }
}

class CreateDayBlock extends React.Component {
     render () {
        return (
            <div className="td">
                <div className='calendarDay'/>
                <div className="planHeader">
                    <div className='allDayPlan'/>
                    <div className='timeDayPlan'/>
                </div>
            </div>);
    }
}

class CalendarBody extends React.Component {
    render () {
        return (
            <div className="calendarBody">
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />
                <CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock /><CreateDayBlock />

            </div>
        )
    }
}

var DatesInCalendar;

function Calendar (year, month) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
        lastDayMonthBefore=new Date(year, month, 0).getDate()+1,
        D = new Date(year, month, Dlast),
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
        calendarDate = [], calendarDayNum = [], forLenthCal = [];             //quantity of days month before plus this month
    var shortMonthName =['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'ноя', 'дек'];
    var Len;

    let clearToday = document.querySelector('.td.today');
    if (clearToday) {
        clearToday.classList.remove('today');
    }

    if (DNfirst == 0) {Len = 6} else if (DNfirst == 1) {Len = 0} else {Len = DNfirst-1}  //quantity of days month before

    //days month before

    if (Len != 0) {
        for (var i = 0; i<Len; i++) {
            var innerText = lastDayMonthBefore - (Len - i),
            monthId, yearId;
            if (month == 0) {
                monthId = 12;
                yearId = year*1 - 1
            } else {
                monthId = month*1;
                yearId = year*1
            }
            var dateMothBefore = {
                date: innerText + '.' + monthId + '.' + yearId,
                month: 'before'
            };
            calendarDate.push(dateMothBefore);
            forLenthCal.push(1);
            calendarDayNum.push(innerText);

        }
    }

    //  Main Calendar

    for (let i = 1; i <= Dlast; i++) {
        let innerText = i, dateThisMoth;
        let monthId = month*1 + 1;
        if (innerText < 10) {
            dateThisMoth = {
                date: '0' + innerText + '.' + monthId + '.' + year,
                month: 'thisMonth'
            };
        } else {
            dateThisMoth = {
            date: innerText + '.' + monthId + '.' + year,
            month: 'thisMonth'
            }
        }
        calendarDate.push(dateThisMoth);
        forLenthCal.push(1);
        if (innerText == 1){
            let monShort = shortMonthName[month];
            let toWrite = innerText + ' ' + monShort;
            calendarDayNum.push(toWrite);
        } else {calendarDayNum.push(innerText);}

    }

    //days next month

    for (let i = 1; i <= (42 - forLenthCal.length); i++) {
        let innerText = i;
        let monthID, yearID;
            if (month*1 < 11) {
                monthID = month*1 + 2;
                yearID = year
            } else {
                monthID = month*1 - 10;
                yearID = year*1 + 1
            }
        let dateNextMoth;
            if (innerText < 10) {
                dateNextMoth= {
                    date: '0' + innerText + '.' + monthID + '.' + yearID,
                    month: 'next'
            };
        } else {
                dateNextMoth= {
                    date: innerText + '.' + monthID + '.' + yearID,
                    month: 'next'
                };
            }
        calendarDate.push(dateNextMoth);

        if (innerText == 1){
            let monShort;
            if (month == 11){
            monShort = shortMonthName[0];
            } else {
                monShort = shortMonthName[(month+1)];
            }

            let toWrite = innerText + ' ' + monShort;
            calendarDayNum.push(toWrite);
        }  else {calendarDayNum.push(innerText);}
    }

    // write calendar;

    let arrDays = $ ('.calendarDay');
    for (let i = 0; i<42; i++) {
        arrDays[i].innerText = calendarDayNum[i]
    }

    // write data-date;

    let arrTD = $ ('.calendarBody .td');
    for (let i = 0; i < 42; i++) {
        arrTD[i].dataset.date = calendarDate[i].date;
        arrTD[i].dataset.month = calendarDate[i].month
    }

    for (let i = 0; i < 42; i++) {
        let dataThisDay = arrTD[i].dataset.date;
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        let today = new Date ().toLocaleString ("ru", options);
        if (dataThisDay == today) {
            arrTD[i].className = 'td today'
        }


    }

    DatesInCalendar = calendarDate;

    writeDayEvents ();
}

//база мероприятий

var arrModal = [];


if ( !localStorage.getItem("eventsArray") || localStorage.getItem("eventsArray") == [] ) {
    var arrModal = [];
} else {
    arrModal = JSON.parse(localStorage.getItem("eventsArray"));
}

//ФУНКЦИОНАЛ

//Компоненты мероприятий

class ModalDay extends React.Component {
    render () {
        return (
                <div className='modalWindowBody hidden' id="modalWindow">
                    <button onClick = {this.props.add} className="add">Добавить</button>
                    <button onClick = {this.props.close} className="close">Закрыть</button>
                    <div className='date'/>
                    <p>Запланировано:</p>
                    <div className='plansContainer'/>
                </div>
        );
    }
}

class ModalEvent extends React.Component {
    constructor (props){
        super (props);
        this.save = this.save.bind(this);
    };
    save () {
        let d = this.refs.newDate.value,
            t = this.refs.newTime.value,
            text = this.refs.newTxt.value,
            id = new Date().getMilliseconds() + '_' + new Date().getDate() + '_' + new Date().getMonth();
        let newArrElem = {
            id: id,
            date: d,
            time: t,
            text: text
        };

        let itIsDubleEvent,
            elemForChange;

        if (selectedEvent == ''){
            arrModal.push(newArrElem);
            for (let j = 0; j < arrModal.length; j++) {
                if (newArrElem.id != arrModal[j].id && newArrElem.time == arrModal[j].time && newArrElem.date == arrModal[j].date) {
                    itIsDubleEvent = 1;
                } else continue;
            }
        } else {
            newArrElem.id = selectedEvent.id;
            for (let j = 0; j < arrModal.length; j++) {
                if (newArrElem.id != arrModal[j].id && newArrElem.time == arrModal[j].time && newArrElem.date == arrModal[j].date) {
                    itIsDubleEvent = 1;
                } else continue;
            }
            for (let i = 0; i < arrModal.length; i++) {
                if (selectedEvent.id == arrModal[i].id)
                {
                    elemForChange = i;
                    arrModal.splice(elemForChange, 1, newArrElem)
                }
            }
        }

        console.log (arrModal);
        this.props.changeState(false);
        localStorage.setItem( 'eventsArray', JSON.stringify(arrModal) );

        console.log (itIsDubleEvent);
        console.log (selectedEvent);

        if (itIsDubleEvent == 1) {
            document.getElementById('ModalMessage').classList.remove("hidden");
            document.querySelector('.modalBackground').classList.remove("hidden");
        }
    };
    addDatepicker () {addDatepicker ()}
    isEventSelected = ()=> {
        if(selectedEvent){
            return selectedEvent
        } else { return "" }
    };
    rendNorm = ()=> {
        return (
            <div className='modalEvent hidden' id='modalEvent'>
                <button onClick={this.props.edit} className="edit">Редактировать</button>
                <button onClick={this.props.deleteEv} className="delete">Удалить</button>
                <button onClick={this.props.close} className="close">Закрыть</button>
                <div className='date'>
                    <p>Дата: </p>
                    <p ref="thisDate" className='date'>{this.isEventSelected.date}</p>
                </div>
                <div className='time'>
                    <p>Время: </p>
                    <p ref="thisTime" className='time'>{this.isEventSelected.time}</p>
                </div>
                <div className='eventText'>
                    <p>Запланировано: </p>
                    <p ref="thisTxt" className='evenText'>{this.isEventSelected.text}</p>
                </div>
            </div>
        )
    };
    rendEdit = () => {
        return (
                <div className='modalEvent hidden' id='modalEvent'>
                    <div>
                        <p>Дата: </p>
                        <input ref="newDate"
                               type='text'
                               id='datepicker'
                               defaultValue={this.isEventSelected().date}
                               onClick={this.addDatepicker}
                        />
                    </div>
                    <div>
                        <p>Время: </p>
                        <input ref="newTime"
                               type='text'
                               id='timepicker'
                               className='time'
                               defaultValue={this.isEventSelected().time}
                        />
                    </div>
                    <div>
                        <p>Запланировано: </p>
                        <textarea ref="newTxt" className='evenText' defaultValue={this.isEventSelected().text}/>
                    </div>
                    <button onClick = {this.save} className="save">Сохранить</button>
                    <button onClick={this.props.close} className="close">Закрыть</button>
                </div>
        )
    };
    render () {
        if (this.props.state.edit) {
            return this.rendEdit();
        } else {
            return this.rendNorm();
        }
    }
}

class Search extends React.Component {
    render () {
        return (
            <div className='modalWindowSearch hidden' id="modalSearch">
                <button onClick = {this.props.close} className="close">Закрыть</button>
                <p>Найдено:</p>
                <div className='plansContainer'/>
            </div>
        );
    }
}

class ModalMessage extends React.Component {
    close = () => {
        document.getElementById('ModalMessage').classList.add("hidden");
        document.querySelector('.modalBackground').classList.add("hidden");
    };
    render () {
        return (
            <div className='ModalMessage hidden' id="ModalMessage">
                <div className='message'>
                    <p>Обратите внимание что а это время у Вас уже есть планы.</p>
                    <p>Возможно стоит перенести мероприятие на другое время?</p>
                </div>
                <button onClick = {this.close} className="close">Закрыть</button>
            </div>
        );
    }
}

class ModalsAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false};
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.saved = this.saved.bind(this);
        this.close = this.close.bind(this);
    };
    add = ()=> {
        document.getElementById('modalWindow').classList.add("hidden");
        document.getElementById('modalEvent').classList.remove("hidden");
        this.setState( {edit: true} );
        selectedEvent = '';
    };

    edit () {
        this.setState ({edit: true});
        addDatepicker ()
    };
    saved () {
        this.setState ({edit: false});
        writeDayEvents ();
        selectedEvent = '';
        this.close();
        localStorage.setItem( 'eventsArray', JSON.stringify(arrModal) );
    };
    close = ()=> {
        document.getElementById('modalEvent').classList.add("hidden");
        document.getElementById('modalWindow').classList.add("hidden");
        document.getElementById('modalSearch').classList.add("hidden");
        document.querySelector('.modalBackground').classList.add("hidden");
        selectedEvent = '';
        this.setState ({edit: false});
    };
    deleteEv = ()=> {
        let elemForDelete,
            id = selectedEvent.id;
        for (let i = 0; i < arrModal.length; i++)
        {
            if (arrModal[i].id == id) {
                elemForDelete = i;
            }
        }
        if (elemForDelete >=0) {
            arrModal.splice(elemForDelete, 1)
        }
        writeDayEvents ();
        this.close();
        localStorage.setItem( 'eventsArray', JSON.stringify(arrModal) );
    };
    render () {
        return (
            <div className='modalBackground hidden' >
                <ModalDay
                    add={this.add}
                    close={this.close}
                />
                <ModalEvent
                    state={this.state}
                    close={this.close}
                    edit={this.edit}
                    deleteEv={this.deleteEv}
                    changeState={this.saved}
                />
                <Search close={this.close} />
                <ModalMessage />
            </div>
        )
    }
}

ReactDOM.render(
    <div className='allContainer'>
        <CalendarAll/>
        <ModalsAll/>
    </div>
    ,
    place
);
{Calendar (new Date ().getFullYear(), new Date ().getMonth())}

$ ('.calendarBody .td').click(function () {
    document.getElementById('modalWindow').classList.remove("hidden");
    document.querySelector('.modalBackground').classList.remove("hidden");
    writeModalDay (this)
});

// функция заполняет окно "День"

function writeModalDay (day){
    let date = day.dataset.date;
    document.querySelector('.modalWindowBody .date').innerHTML = 'Дата: ' + date;
    if (document.querySelector('.plansContainer div')) {
        document.querySelector('.plansContainer').innerHTML = '';
    }
    let eventHeader ='' ;
    for (let i = 0; i < arrModal.length; i++) {

        if (arrModal[i].date == date) {
            eventHeader += '<div onclick="openEvent(this)" class="eventInDay" data-id="' +
                arrModal[i].id + '">' + arrModal[i].time + arrModal[i].text + '</div>'
        }
    }
    if (eventHeader != '')
        document.querySelector('.plansContainer').innerHTML = eventHeader
}

// заполняет события дня календаря

function writeDayEvents () {
    let arrTD = $ ('.calendarBody .td');

    for (var i = 0; i < 42; i++) {

        let eventHeader = '';
        let eventAllDay = '';

        arrTD[i].children[1].children[1].innerHTML = '';
        arrTD[i].children[1].children[0].innerHTML = '';

        for (let j = 0; j < arrModal.length; j++) {
            if (arrModal[j].date != DatesInCalendar[i].date) {
                continue
            } else if (arrModal[j].date == DatesInCalendar[i].date && arrModal[j].time != '') {
                eventHeader += '<span>' + arrModal[j].time + ' ' + arrModal[j].text + '</span><br>';
            }
            if (eventHeader) {
                arrTD[i].children[1].children[1].innerHTML = eventHeader;
            }
        }

        for (let j = 0; j < arrModal.length; j++) {
            if (arrModal[j].date != DatesInCalendar[i].date) {
                continue
            } else if (arrModal[j].date == DatesInCalendar[i].date && arrModal[j].time == '') {
                eventAllDay += '<span>' + arrModal[j].text + '</span><br>';
            }
            if (eventAllDay) {
                arrTD[i].children[1].children[0].innerHTML = eventAllDay;
            }
        }
    }
}

function openEvent (event) {
    document.getElementById('modalWindow').classList.add("hidden");
    document.getElementById('modalSearch').classList.add("hidden");
    document.getElementById('modalEvent').classList.remove("hidden");
    writeEvent (event.dataset.id)
}

var selectedEvent;

function writeEvent (id) {
    for (let i = 0; i < arrModal.length; i++) {

        if (arrModal[i].id == id) {
            var event = arrModal[i];
            $ ('#modalEvent p.date')[0].innerText = arrModal[i].date;
            $ ('#modalEvent p.time')[0].innerText = arrModal[i].time;
            $ ('#modalEvent p.evenText')[0].innerText = arrModal[i].text;
            selectedEvent = event;
        }
    }
}

// Search

$ ('#searchBtn').click(function () {

    document.getElementById('modalSearch').classList.remove("hidden");
    document.querySelector('.modalBackground').classList.remove("hidden");
    writeModalSearch (readInput());
    document.getElementById('searchValue').value = "";

});

function writeModalSearch (text) {

    if (document.querySelector('#modalSearch .plansContainer div')) {
        document.querySelector('#modalSearch .plansContainer').innerHTML = ''
    }
    let eventHeader ='';

    for (let i = 0; i < arrModal.length; i++) {
        let forSearhWithData = arrModal[i].text + arrModal[i].date;
        if ( forSearhWithData.indexOf(text) >= 0) {
            eventHeader += '<div onclick="openEvent(this)" class="eventInDay" ' +
                'data-id="' + arrModal[i].id + '">' + arrModal[i].date + ': '
                + arrModal[i].text + '</div>'
        } else continue;
    }
    if (eventHeader != '') {
        document.querySelector('#modalSearch .plansContainer').innerHTML = eventHeader
    }
}

function readInput() {
    var value = document.getElementById('searchValue').value;

    if (value.length === 0) {
        return false;
    }
    return value;
}

jQuery.datetimepicker.setLocale('ru');

function addDatepicker () {
    $('#datepicker').datetimepicker({
        timepicker:false,
        format:'d.m.Y',
    });
    $('#timepicker').datetimepicker({
        datepicker:false,
        format:'H:i',
    });
}


