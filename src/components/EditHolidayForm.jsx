import React, { Component } from "react";
import { Form, Input, Button, Card} from "antd";
import moment from "moment";

import * as Constant from "../utils/Constant";

const style = {
    width: 500,
    marginLeft: 20
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

class EditHolidayForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: {
                id: 0,
                employee: {
                    name: null,
                    description: null
                },
                start: null,
                end: null,
                note: null,
                businessUnit: {
                    name: null,
                    description: null
                },
                responsible1: {
                    name: null,
                    description: null
                },
                approvedBy1: true,
                responsible2: {
                    name: null,
                    description: null
                },
                approvedBy2: true,
                approved: false
            }
        }
    };

    getId() {
        const id = this.props.match.params.id;
        if(id) {
            return id;
        } else {
            console.log("ID not found in URL");
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch(Constant.HOLIDAY_API_BY_ID + this.getId());
            const json = await response.json();
            this.setState({
                isLoaded: true,
                item: json
            });
        } catch (error) {
            console.log(error);
        }
        // Set field value
        console.log("State",this.state);
        this.props.form.setFieldsValue({ note: this.state.item.note });
    }

    async postData(values) {
        const body = {
            id: this.getId(),
            note: values["note"]
        };
        console.log("Sending to backend", body);

        const rawResponse = await fetch(Constant.HOLIDAY_EDIT_API, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        console.log("Response from backend", content);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValues) => {
            this.postData(fieldsValues);
        });
    };

    async approve1() {
        const rawResponse = await fetch(Constant.HOLIDAY_BASE_API + this.getId() + "/approve1", {
            method: 'post',
            headers: headers
        });
        const content = await rawResponse.json();
        console.log("Response from backend", content);
        this.setState({
            error: null,
            isLoaded: false,
            item: content
        });
    }

    async approve2() {
        const rawResponse = await fetch(Constant.HOLIDAY_BASE_API + this.getId() + "/approve2", {
            method: 'post',
            headers: headers
        });
        const content = await rawResponse.json();
        console.log("Response from backend", content);
        this.setState({
            error: null,
            isLoaded: false,
            item: content
        });
    }

    render() {

        const i = this.state.item;
        const approved1 = this.state.item.approvedBy1;
        const approved2 = this.state.item.approvedBy2;
        const {
            getFieldDecorator
        } = this.props.form;



        return(
            <div style={style}>
                <h1>{"Edit Holiday Request"}</h1>
                <Card title={"Holiday Request #" + this.getId()}>
                    <p><b>{"Emplyee: "}</b>{i.line.name}</p>
                    <p><b>{"Business Unit: "}</b>{i.company.name}</p>
                    <p><b>{"Start: "}</b>{moment(i.start).format(Constant.DATE_FORMAT)}</p>
                    <p><b>{"End: "}</b>{moment(i.start).format(Constant.DATE_FORMAT)}</p>
                </Card>
                <Card title={"Edit Note"}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Note"
                        >
                            {getFieldDecorator('note', {
                                rules: [{ required: false, message: 'Please insert Note' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Edit note</Button>
                    </Form>
                </Card>
                <Card title="First responsible">
                    <p>{i.responsible1.name}</p>
                    <Button type={approved1 ? "dashed" : "primary"} disabled={approved1} onClick={this.approve1.bind(this)} htmlType="submit">{approved1 ? "Approved" : "Approve"}</Button>
                </Card>
                <Card title="Second responsible">
                    <p>{i.responsible2.name}</p>
                    <Button type={approved2 ? "dashed" : "primary"} disabled={approved2} onClick={this.approve2.bind(this)} htmlType="submit">{approved2 ? "Approved" : "Approve"}</Button>
                </Card>
            </div>
        )
    }
}

const WrappedEditHolidayForm = Form.create({name: "edit_holiday_form"})(EditHolidayForm);

export default WrappedEditHolidayForm;