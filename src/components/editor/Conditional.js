// @flow
import React, { Component } from 'react';
import { RIESelect, RIEInput, RIENumber } from 'riek';
import type { Conditional, GenderConditional , AgeConditional , DateConditional , SocioeconomicStatusConditional , RaceConditional , SymptomConditional , ObservationConditional , VitalSignConditional , ActiveConditionConditional , ActiveMedicationConditional , ActiveCarePlanConditional , PriorStateConditional , AttributeConditional , AndConditional , OrConditional , AtLeastConditional , AtMostConditional , NotConditional } from '../../types/Conditional';
import { Codes } from './Code';
import {TypeTemplates} from '../../templates/Templates';

type Props = {
  conditional: Conditional,
  onChange: any
}

const unitOfAgeOptions = [
  {id: 'years', text: 'years'},
  {id: 'months', text: 'months'},
  {id: 'weeks', text: 'weeks'},
  {id: 'days', text: 'days'},
  {id: 'hours', text: 'hours'},
  {id: 'minutes', text: 'minutes'},
  {id: 'seconds', text: 'seconds'}
];

class ConditionalEditor extends Component<Props> {

  renderConditionalType() {
    switch (this.props.conditional.condition_type) {
      case "Gender":
        return <Gender {...this.props} />
      case "Age":
        return <Age {...this.props} />
      case "Date":
        return <Date {...this.props} />
      case "Socioeconomic Status":
        return <SocioeconomicStatus {...this.props} />
      case "Race":
        return <Race {...this.props} />
      case "Symptom":
        return <Symptom {...this.props} />
      case "Observation":
        return <Observation {...this.props} />
      case "Vital Sign":
        return <VitalSign {...this.props} />
      case "Active Condition":
        return <ActiveCondition {...this.props} />
      case "Active Medication":
        return <ActiveMedication {...this.props} />
      case "Active CarePlan":
        return <ActiveCarePlan {...this.props} />
      case "Prior State":
        return <PriorState {...this.props} />
      case "Attribute":
        return <Attribute {...this.props} />
      case "And":
        return <And {...this.props} />
      case "Or":
        return <Or {...this.props} />
      case "At Least":
        return <AtLeast {...this.props} />
      case "At Most":
        return <AtMost {...this.props} />
      case "Not":
        return <Not {...this.props} />
      default:
        return this.props.conditional.condition_type

    }
  }

  render() {
    if (!this.props.conditional) {
      return null;
    }
    let options = Object.keys(TypeTemplates.Condition).sort().map((k) => {return {id: k, text: k}});
    return (
      <div>
        Condition Type: <RIESelect propName='condition' value={{id: this.props.conditional.condition_type, text: this.props.conditional.condition_type}} change={(val) => this.props.onChange({condition:{id: TypeTemplates.Condition[val.condition.id]}})} options={options} />
        <br/>
        {this.renderConditionalType()}
      </div>
    );
  }
}

class Gender extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): GenderConditional);
    return (
      <label> Gender:
        <RIESelect
          propName='gender'
          value={{id: conditional.gender, text: conditional.gender}}
          change={this.props.onChange('gender')}
          options={[{id:'M', text: 'M'}, {id:'F', text: 'F'}]}
        />
      </label>
    );
  }

}

class Age extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AgeConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];
    return (
      <label> Age:
      <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber value={conditional.quantity} propName='quantity' change={this.props.onChange('quantity')} />
      <RIESelect value={{id: conditional.unit, text: conditional.unit}} propName="unit" change={this.props.onChange('unit')} options={unitOfAgeOptions} />
      </label>
    );
  }

}

class Date extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): DateConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];
    return (
      <label> Date:
      <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber value={conditional.year} propName='year' change={this.props.onChange('year')} />
      </label>
    );
  }

}

class SocioeconomicStatus extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): SocioeconomicStatusConditional);
    let options = [
      {id: 'Low', text: 'Low'},
      {id: 'Middle', text: 'Middle'},
      {id: 'High', text: 'High'}
    ];
    return (
      <label> Socioeconomic Status:
        <RIESelect value={{id: conditional.category, text: conditional.category}} propName="category" change={this.props.onChange('category')} options={options} />
      </label>
    )
  }

}

class Race extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): RaceConditional);
    let options = [
      {id: "White", text: "White"},
      {id: "Native", text: "Native"},
      {id: "Hispanic", text: "Hispanic"},
      {id: "Black", text: "Black"},
      {id: "Asian", text: "Asian"},
      {id: "Other", text: "Other"}
    ];
    return (
      <label> Race:
        <RIESelect value={{id: conditional.race, text: conditional.race}} propName="race" change={this.props.onChange('race')} options={options} />
      </label>
    );
  }

}

class Symptom extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): SymptomConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];

    return (
      <label> Symptom:
      <RIEInput value={conditional.symptom} propName="symptom" change={this.props.onChange('symptom')} />
      <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber value={conditional.value} propName='value' change={this.props.onChange('value')} />

      </label>
    );
  }

}

class Observation extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ObservationConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}, {id: "is nil", text: "is nil"}, {id: "is not nil", text: "is not nil"}];

    return (
      <label> Observation:
        <Codes codes={conditional.codes} onChange={this.props.onChange('codes')} />
        <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
        <RIENumber value={conditional.value} propName='value' change={this.props.onChange('value')} />
      </label>
    );
  }

}

class VitalSign extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): VitalSignConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];

    return (
      <label> Vital Sign:
      <RIEInput value={conditional.vital_sign} propName="vital_sign" change={this.props.onChange('vital_sign')} />
      <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
      <RIENumber value={conditional.value} propName='value' change={this.props.onChange('value')} />

      </label>
    );
  }

}

class ActiveCondition extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveConditionConditional);

    return (
      <label> Active Condition:
        <Codes codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class ActiveMedication extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveMedicationConditional);
    return (
      <label> ActiveMedication:
      <Codes codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class ActiveCarePlan extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): ActiveCarePlanConditional);
    return (
      <label> ActiveCarePlan:
      <Codes codes={conditional.codes} onChange={this.props.onChange('codes')} />
      </label>
    );
  }

}

class PriorState extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): PriorStateConditional);
    return (
      <label> PriorState:
      </label>
    );
  }

}

class Attribute extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AttributeConditional);
    let options = [{id: '==' , text:'==' }, {id: '!=' , text:'!=' }, {id: "<" , text:"<" }, {id: "<=" , text:"<=" }, {id: ">" , text:">" }, {id: ">=", text:">="}];
    return (
      <label>
        <RIEInput value={conditional.attribute} propName="attribute" change={this.props.onChange('attribute')} />
        <RIESelect value={{id: conditional.operator, text: conditional.operator}} propName="operator" change={this.props.onChange('operator')} options={options} />
        <RIENumber value={conditional.value||0} propName='value' change={this.props.onChange('value')} />
      </label>
    );
  }

}

class And extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AndConditional);
    return (
      <label> And:
        {conditional.conditions.map((cond, i) => {
          return <ConditionalEditor key={i} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
        })}
      </label>
    );
  }

}

class Or extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): OrConditional);
    return (
      <label> Or:
        {conditional.conditions.map((cond, i) => {
          return <ConditionalEditor key={i} conditional={cond} onChange={this.props.onChange(`conditions.${i}`)} />
        })}
      </label>
    );
  }

}

class AtLeast extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AtLeastConditional);
    return (
      <label> AtLeast:
      </label>
    );
  }

}

class AtMost extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): AtMostConditional);
    return (
      <label> AtMost:
      </label>
    );
  }

}

class Not extends Component<Props> {

  render() {
    let conditional = ((this.props.conditional: any): NotConditional);
    return (
      <label> Not:
        <ConditionalEditor conditional={this.condition} onChange={this.props.onChange('conditional')} />
      </label>
    );
  }

}

export default ConditionalEditor;
