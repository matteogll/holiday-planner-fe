import React, { Component } from "react";
import { Form, Select, Input, DatePicker, Button, Modal} from "antd";
import * as Constant from "../utils/Constant";

const { Option } = Select;

const style = {
    width: 500,
    marginLeft: 20
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

class AddHolidayForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsibles: {
                error: null,
                isLoaded: false,
                items: []
            },
            lines: {
                error: null,
                isLoaded: false,
                items: []
            },
            companies: {
                error: null,
                isLoaded: false,
                items: []
            }
        }
    };

    fetchResponsibles() {
        fetch(Constant.RESPONSIBLE_API)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("Fetching responsibles", data);
                    this.setState({
                        responsibles: {
                            isLoaded: true,
                            items: data
                        }
                    });
                },
                (error) => {
                    console.log("Error while retrieving responsibles");
                    this.setState({
                        responsibles: {
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }

    fetchLines() {
        fetch(Constant.EMPLOYEE_API)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("Fetching lines", data);
                    this.setState({
                        lines: {
                            isLoaded: true,
                            items: data
                        }
                    });
                },
                (error) => {
                    console.log("Error while retrieving lines");
                    this.setState({
                        lines: {
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }

    fetchCompanies() {
        fetch(Constant.BUSINESS_UNIT_API)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("Fetching companies", data);
                    this.setState({
                        companies: {
                            isLoaded: true,
                            items: data
                        }
                    });
                },
                (error) => {
                    console.log("Error while retrieving companies");
                    this.setState({
                        companies: {
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchResponsibles();
        this.fetchLines();
        this.fetchCompanies();
    }

    convertHolidayJSON(values) {
        return {
            employee: values["employee"],
            start: values["start"],
            end: values["end"],
            businessUnit: values["business-unit"],
            note: values["note"],
            responsible1: values["first_responsible"],
            responsible2: values["second_responsible"]
        }
    }

    async postData(values) {
        const body = JSON.stringify(this.convertHolidayJSON(values));
        console.log("Sending to backend", body);

        const rawResponse = await fetch(Constant.HOLIDAY_ADD_API, {
            method: 'post',
            headers: headers,
            body: body
        });
        const content = await rawResponse.json();

        console.log("Response from backend", content);
        // Versione con promise
        /*
        fetch(Constant.HOLIDAY_ADD_API, {
            method: 'post',
            headers: headers,
            body: body
        }).then(res=>res.json())
            .then(res => console.log(res));
        */
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, fieldsValues) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValues);
                // Validate END DATE
                const start = fieldsValues["start"];
                const end = fieldsValues["end"];
                console.log("Start", start);
                console.log("End", end);
                if(start && end && start.isAfter(end)) {
                    console.log("End must be later than start");
                    Modal.error({
                        title: "End date error",
                        content: "End must be later than start"
                    });
                    return;
                }
                // Validate RESPONSIBLE
                const firstResponsible = fieldsValues["first_responsible"];
                const secondReponsible = fieldsValues["second_responsible"];
                if(firstResponsible == secondReponsible) {
                    console.log("Second responsible must be different from First responsible");
                    Modal.error({
                        title: "Second responsible error",
                        content: "Second responsible must differ from first one"
                    });
                    return
                }
                // validation finished
                const values = {
                    ...fieldsValues,
                    start: fieldsValues["start"].format(Constant.DATE_FORMAT),
                    end: fieldsValues["end"].format(Constant.DATE_FORMAT),
                };
                await this.postData(values);
                console.log("Values", values);
                this.props.history.push("/list");
            } else {
                console.log("Validation error", err);
            }

        });
    };

    render() {
        const lines = this.state.lines.items;
        const companies = this.state.companies.items;
        const responsibles = this.state.responsibles.items;

        const {
            getFieldDecorator
        } = this.props.form;

        const datePickerConfig = {
            rules: [{ type: 'object', required: true, message: 'Please select date' }],
        };
        return(
            <div style={style}>
                <h1>{"Add Holiday Request"}</h1>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                        label="Employee"
                    >
                        {getFieldDecorator("employee", {
                            rules: [{ required: true, message: 'Please insert Employee' }],
                        })(
                            <Select>
                                {lines.map(line => (
                                        <Option value={line.name} key={line.name}>
                                            {line.name}
                                        </Option>
                                    )
                                )}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Business Unit"
                    >
                        {getFieldDecorator("business-unit", {
                            rules: [{ required: true, message: 'Please insert Business Unit' }],
                        })(
                            <Select>
                                {companies.map(company => (
                                        <Option value={company.name} key={company.name}>
                                            {company.name}
                                        </Option>
                                    )
                                )}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Start"
                    >
                        {getFieldDecorator("start", datePickerConfig)(
                            <DatePicker format={Constant.DATE_FORMAT} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="End"
                    >
                        {getFieldDecorator("end", datePickerConfig)(
                            <DatePicker format={Constant.DATE_FORMAT} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Note"
                    >
                        {getFieldDecorator('note', {
                            rules: [{ required: false, message: 'Please insert Note' }],
                        })(
                            <Input placeholder="Note" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="First Responsible"
                    >
                        {getFieldDecorator("first_responsible", {
                            rules: [{ required: true, message: 'Please insert First Responsible' }],
                        })(
                            <Select>
                                {responsibles.map(responsible => (
                                        <Option value={responsible.name} key={responsible.name}>
                                            {responsible.name}
                                        </Option>
                                    )
                                )}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Second Responsible"
                    >
                        {getFieldDecorator('second_responsible', {
                            rules: [{ required: true, message: 'Please insert Second Responsible' }],
                        })(
                            <Select>
                                {responsibles.map(responsible => (
                                        <Option value={responsible.name} key={responsible.name}>
                                            {responsible.name}
                                        </Option>
                                    )
                                )}
                            </Select>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Add maintenance</Button>
                </Form>
            </div>
        )
    }
}

const WrappedAddHolidayForm = Form.create({name: "add_holiday_form"})(AddHolidayForm);

export default WrappedAddHolidayForm;
