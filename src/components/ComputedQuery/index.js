import React from 'react'
import { connect } from 'react-redux'
import { changeField } from '../../store/actions'
import { getLookupItems } from '../../api'
import * as R from 'ramda';
import moment from 'moment-jalali'
import { access } from 'fs';

const computeFunction = func => inArr => {
    const isDate = (typeof inArr[0] == 'string' && inArr[0].slice(4, 5) === '-')
    let arr = isDate ?
        R.map(x => new Date(x), inArr)
        : inArr
    switch (func) {
        case 'Sum':
            return R.sum(arr)
        case 'Multi':
            return R.product(arr)
        case 'Avg':
            return R.mean(arr)
        case 'Min':
            return isDate ?
                moment(new Date(Math.min.apply(null, arr))).format('jYYYY/jMM/jDD')
                : arr.length == 0 ? '' : R.reduce(R.min, Number.MAX_SAFE_INTEGER, arr)
        case 'Max':
            return isDate ?
                moment(new Date(Math.max.apply(null, arr))).format('jYYYY/jMM/jDD')
                : arr.length == 0 ? '' : R.reduce(R.max, Number.MIN_SAFE_INTEGER, arr)
        case 'First':
            return R.head(arr)
    }
}
class ComputedQuery extends React.Component {

    constructor(props) {
        super(props)
        this.state = { options: [] }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(nextProps) != JSON.stringify(this.props) || JSON.stringify(nextState) != JSON.stringify(this.state))
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.reduxContainFields) != JSON.stringify(nextProps.reduxContainFields))
            this.loadPosts(nextProps);
    }

    loadPosts() {
        // do something with props
        let field = this.props.field;

        let query = field.Query;
        let { containFields } = this.props;

        let fieldsStr = new RegExp(Object.keys(this.props.reduxContainFields).map((key) => ("{{" + key + "}}")).join("|"), "gi")
        query = query.replace(fieldsStr, matched => (this.props.reduxContainFields[matched.substring(2, matched.length - 2)]));

        getLookupItems({ ...field, query: query }).then((response) => {
            const options = response.data.d.results;
            console.log(options);
            let value = '';
            if (options.length > 1) {
                switch (field.AggregationFunction) {
                    case 'Max':
                        value = Math.max(options.map(itm => itm[field.LookupTitleField]))
                        break;
                    case 'Min':
                        value = Math.min(options.map(itm => itm[field.LookupTitleField]))
                        break;
                    case 'Sum':
                        value = options.map(itm => itm[field.LookupTitleField]).reduce((a, b) => a + b, 0)
                        break;
                    case 'Avg':
                        value = options.map(itm => itm[field.LookupTitleField]).reduce((a, b) => (a + b, 0)) / options.length;
                        break;
                    case 'Multi':
                        value = options.map(itm => itm[field.LookupTitleField]).reduce((a, b) => (a * b, 1))
                        break;

                }

            }
            else {
                value = options[1][field.LookupTitleField];
            }
            this.props.dispatch(changeField(this.props.internalName, value));
        }).
            catch((error) => console.log(error));
    }
    componentDidMount() {
        console.log('computed first',this.props.field.value)
        this.loadPosts()
    }

    handleChange=(e)=>
    {
        this.props.dispatch(changeField(this.props.internalName,e.target.value))
        console.log('computed second',this.props.field.value)
    }
    render(){
        let { InternalName, value } = this.props.field;

        
        return this.props.render({ value, Disable: 'disabled', internalName: InternalName, onChange: this.handleChange })
    }
}
const mapStateToProps = (state, props) => ({
    field: state.fields[props.internalName],
    reduxContainFields: props.containFields.reduce(
        (acc, internalName) => Object.assign(acc, {[internalName]: state.fields[internalName].value}),
        {}
       ) 
       })
export default connect(mapStateToProps)(ComputedQuery)