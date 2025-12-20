let people = [];
let dogs = [];
let bushes = [];
let leashLength = 80;
let selectedPerson = null;
let offset;

// --------------------------------------------
// Setup
// --------------------------------------------
function setup() {
  createCanvas(800, 600);

  // Create bushes
  for (let i = 0; i < 12; i++) {
    bushes.push({
      x: random(100, width - 100),
      y: random(100, height - 100),
      r: random(30, 60)
    });
  }

  // Create people
  for (let i = 0; i < 3; i++) {
    people.push(new Person(random(width), random(height)));
  }

  // Create dogs with random owners
  for (let i = 0; i < 5; i++) {
    let owner = random(people);
    dogs.push(new Dog(random(width), random(height), owner));
  }
}

// --------------------------------------------
// Draw Loop
// --------------------------------------------
function draw() {
  background(245);

  // Draw bushes
  for (let b of bushes) {
    fill(50, 100, 50, 130);
    noStroke();
    ellipse(b.x, b.y, b.r * 2);
  }

  // Dogs update first
  for (let d of dogs) {
    d.update();
    d.display();
  }

  // People update last
  for (let p of people) {
    p.update();
    p.display();
  }

  // Draw leashes
  stroke(80);
  for (let d of dogs) {
    line(d.owner.x, d.owner.y, d.x, d.y);
  }
}

// --------------------------------------------
// Person Class
// --------------------------------------------
class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.selected = false;

    // Wander movement
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
  }

  update() {
    if (this.selected) {
      // Follow mouse while keeping offset
      this.x = mouseX + offset.x;
      this.y = mouseY + offset.y;
    } else {
      // Slow random wandering
      this.x += this.vx;
      this.y += this.vy;

      // Slight direction drift
      this.vx += random(-0.05, 0.05);
      this.vy += random(-0.05, 0.05);

      // Limit speed
      this.vx = constrain(this.vx, -1, 1);
      this.vy = constrain(this.vy, -1, 1);
    }

    // Avoid bushes
    for (let b of bushes) {
      let d = dist(this.x, this.y, b.x, b.y);
      if (d < b.r + 15) {
        let angle = atan2(this.y - b.y, this.x - b.x);
        this.x = b.x + cos(angle) * (b.r + 15);
        this.y = b.y + sin(angle) * (b.r + 15);
      }
    }

    // Stay inside canvas
    this.x = constrain(this.x, 15, width - 15);
    this.y = constrain(this.y, 15, height - 15);
  }

  display() {
    fill(60); // dark gray
    noStroke();
    ellipse(this.x, this.y, 30);
  }

  isClicked() {
    return dist(mouseX, mouseY, this.x, this.y) < 20;
  }
}

// --------------------------------------------
// Dog Class
// --------------------------------------------
class Dog {
  constructor(x, y, owner) {
    this.x = x;
    this.y = y;
    this.owner = owner;
  }

  update() {
    // Slight random walk
    this.x += random(-1, 1);
    this.y += random(-1, 1);

    // Stay within leash length
    let d = dist(this.x, this.y, this.owner.x, this.owner.y);
    if (d > leashLength) {
      let angle = atan2(this.owner.y - this.y, this.owner.x - this.x);
      this.x += cos(angle) * 1.5;
      this.y += sin(angle) * 1.5;
    }

    // Avoid bushes
    for (let b of bushes) {
      let d = dist(this.x, this.y, b.x, b.y);
      if (d < b.r + 10) {
        let angle = atan2(this.y - b.y, this.x - b.x);
        this.x = b.x + cos(angle) * (b.r + 10);
        this.y = b.y + sin(angle) * (b.r + 10);
      }
    }

    // Stay inside canvas
    this.x = constrain(this.x, 10, width - 10);
    this.y = constrain(this.y, 10, height - 10);
  }

  display() {
    fill(200, 120, 40);
    noStroke();
    ellipse(this.x, this.y, 20);
  }
}

// --------------------------------------------
// Mouse Events
// --------------------------------------------
function mousePressed() {
  for (let p of people) {
    if (p.isClicked()) {
      selectedPerson = p;
      p.selected = true;
      offset = { x: p.x - mouseX, y: p.y - mouseY };
      return;
    }
  }
}

function mouseReleased() {
  if (selectedPerson) {
    selectedPerson.selected = false;
    selectedPerson = null;
  }
}
