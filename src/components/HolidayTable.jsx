import React, {Component} from "react";
import {Table} from "antd";
import moment from "moment";

import * as Constant from "../utils/Constant";

const columns = [
    {
        title: "Employee",
        dataIndex: "employee.name"
    },
    {
        title: "Start",
        dataIndex: "start"
    },
    {
        title: "End",
        dataIndex: "end"
    },
    {
        title: "Note",
        dataIndex: "note"
    },
    {
        title: "Business unit",
        dataIndex: "businessUnit.name"
    },
    {
        title: "Approved",
        dataIndex: "approved"
    },
    {
        title: "Actions",
        dataIndex: "link"
    }
];

class HolidayTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    };



    fetchHolidays() {
        fetch(Constant.HOLIDAY_API)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("Fetching items", data);
                    this.setState({
                        isLoaded: true,
                        items: data
                    });
                },
                (error) => {
                    console.log("Error while retrieving items");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchHolidays();
    }

    manipulateItems(items) {
        const manipulatedItems = items.map(function(item) {
            return {
                ...item,
                key: item.id,
                start: moment(item.start).format(Constant.DATE_FORMAT),
                end: moment(item.end).format(Constant.DATE_FORMAT),
                link: <a href={"/edit/"+item.id}>{"Edit"}</a>
            }
        });
        return manipulatedItems;
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const manipulatedItems = this.manipulateItems(items);
        if (error) {
            return (
                <div>Error: {error.message}</div>
            );
        } else if (!isLoaded) {
            return (
                <div>Loading...</div>
            );
        } else {
            console.log("State: ", this.state);
            if (items) {
                return (
                    <Table columns={columns} dataSource={manipulatedItems}></Table>
                );
            } else {
                return <div>No data found</div>;
            }
        }
    }
}

export default HolidayTable;