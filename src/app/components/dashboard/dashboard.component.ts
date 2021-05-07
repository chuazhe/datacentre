import { Component, OnInit, OnDestroy } from '@angular/core';

/*
1) In JavaScript, functions can live anywhere, and data can be passed around freely without being inside a pre-defined class or struct. This flexibility is extremely powerful. “Free” functions (those not associated with a class) working over data without an implied OOP hierarchy tends to be the preferred model for writing programs in JavaScript
2) In TypeScript, objects are not of a single exact type. For example, if we construct an object that satisfies an interface, we can use that object where that interface is expected even though there was no declarative relationship between the two.
*/
interface Metric {
  used: number;
  available: number;
}

interface Node {
  name: string;
  cpu: Metric;
  mem: Metric;
}

/*
The as keyword is a Type Assertion in TypeScript which tells the compiler to consider the object as another type than the type the compiler infers the object to be.
*/
var myGlobalMetric: Metric = { used: 555, available: 888 } as Metric;
var myGlobalCluster: Node[] = {} as Node[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

// extends: The class get all these methods and properties from the parent, so you don't have to implement.
// implements: The class has to implement methods and properties.
// An interface is a syntactical contract that an entity should conform to. In other words, an interface defines the syntax that any entity must adhere to.

export class DashboardComponent implements OnInit, OnDestroy {
  // var declaration is function scoped and let declaration is block scoped.

  myMetric: Metric = { used: 123, available: 987 } as Metric;
  myCluster: Node[] = {} as Node[];

  cpu: Metric = myGlobalMetric;
  mem: Metric = this.myMetric;

  cluster1: Node[] = myGlobalCluster;
  cluster2: Node[] = this.myCluster;

  interval: any;
  
  // https://angular.io/guide/lifecycle-hooks#lifecycle-event-sequence -> ngOnChanges(), ngOnInit(), ...	
  // default class type is public
  ngOnInit(): void {
    this.generateData();
    this.interval = setInterval(() => {
      this.generateData();
    }, 15000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  generateData(): void {
    this.cluster1 = [];
    this.cluster2 = [];
    this.cpu = { used: 0, available: 0 };
    this.mem = { used: 0, available: 0 };
    for (let i = 1; i < 4; i++) this.cluster1.push(this.randomNode(i));
    for (let i = 4; i < 7; i++) this.cluster2.push(this.randomNode(i));
  }

  private randomNode(i: number): Node {
	  
	// this : the nearest object
    let node = {
      name: 'node' + i,
      cpu: { available: 16, used: this.randomInteger(0, 16) },
      mem: { available: 48, used: this.randomInteger(0, 48) },
    };
	
    this.cpu.used += node.cpu.used;
    this.cpu.available += node.cpu.available;
    this.mem.used += node.mem.used;
    this.mem.available += node.mem.available;
    return node;
  }

  private randomInteger(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
