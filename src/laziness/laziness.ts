#!/usr/bin/env node

import { Project, SourceCode } from 'projen';

export class Laziness {

  project: Project;

  constructor(title: string) {
    this.project = new Project({ name: title });
  }

  ts(file: string): SourceCode {
    return new SourceCode(this.project, file);
  }

  synth() {
    this.project.synth();
  }
}