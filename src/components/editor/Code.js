// @flow

import React, { Component } from 'react';
import { RIESelect, RIEInput, RIENumber } from 'riek';
import _ from 'lodash';

import type { Code as CodeType } from '../../types/Code';
import { TypeTemplates } from '../../templates/Templates';

type Props = {
  code: CodeType,
  onChange: any
}

export class Code extends Component<Props> {

  render() {
    let code = this.props.code;
    let codeTypeOptions = ["SNOMED-CT", "RxNorm", "LOINC"].map((c) => {return {id: c, text: c}});
    return (
      <div>
        System: <RIESelect value={{id: code.system, text: code.system}} propName="system" change={this.props.onChange('system')} options={codeTypeOptions} />
        <br />
        Display: <RIEInput value={code.display} propName="display" change={this.props.onChange('display')} />
        <br />
        Code: <RIEInput value={code.code} propName="code" change={this.props.onChange('code')} />
      </div>
    );
  }

}

type CodesProps = {
  codes: CodeType[],
  onChange: any
}
export class Codes extends Component<CodesProps> {
  render() {

    if(!this.props.codes){
      return null;
    }
    return (
      <div>
        {this.props.codes.map((code, i) => {
          return (
            <div key={i}>
              <a onClick={() => this.props.onChange(`[${i}]`)({val: {id: null}})}>x</a>
              <Code onChange={this.props.onChange(i)} code={code} />
            </div>
          )
        })}
        <a onClick={() => this.props.onChange(`[${this.props.codes.length}]`)({val: {id: _.cloneDeep(TypeTemplates.Code)}})}>+</a>

      </div>
    );
  }
}
