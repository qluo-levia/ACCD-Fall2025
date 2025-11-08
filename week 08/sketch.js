// 🐕 People walking dogs in a park — cannot enter bushes
let people = [];
let dogs = [];
let bushes = [];
let leashLength = 80;
let selectedPerson = null;
let offset;

function setup() {
  createCanvas(800, 600);

  // Create 7~15 bushes (rectangular obstacles)
  for (let i = 0; i < 15; i++) {
    bushes.push({
      x: random(100, width - 150),
      y: random(100, height - 150),
      w: random(60, 120),
      h: random(40, 100)
    });
  }

  // Create 5 people and dogs
  for (let i = 0; i < 5; i++) {
    let px = random(width);
    let py = random(height);
    let angle = random(TWO_PI);
    let dx = px + cos(angle) * leashLength * 0.5;
    let dy = py + sin(angle) * leashLength * 0.5;
    people.push(createVector(px, py));
    dogs.push(createVector(dx, dy));
  }
}

function draw() {
  background(185, 230, 90);
  drawBushes();

  // Detect close dogs
  let closePairs = [];
  for (let i = 0; i < dogs.length; i++) {
    for (let j = i + 1; j < dogs.length; j++) {
      if (dogs[i].dist(dogs[j]) < 50) {
        closePairs.push([i, j]);
      }
    }
  }

  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    let dog = dogs[i];

    // Gentle random wander for people
    if (random() < 0.01) {
      person.vx = random(-0.3, 0.3);
      person.vy = random(-0.3, 0.3);
    }
    person.x += person.vx || 0;
    person.y += person.vy || 0;

    // Bounce at canvas edges
    if (person.x < 20 || person.x > width - 20) person.vx *= -1;
    if (person.y < 20 || person.y > height - 20) person.vy *= -1;

    // Dog behavior
    let dogVec = createVector(dog.x, dog.y);
    let personVec = createVector(person.x, person.y);
    let leash = p5.Vector.sub(dogVec, personVec);
    leash.limit(leashLength);

    // Is this dog in a close pair?
    let closePair = closePairs.find(pair => pair.includes(i));
    if (closePair) {
      // Find the other dog
      let other = closePair[0] === i ? closePair[1] : closePair[0];
      let otherDog = dogs[other];

      // Step 1: attraction toward other dog
      let attract = p5.Vector.sub(otherDog, dog).setMag(0.8);
      dog.add(attract);

      // Step 2: owners pull away
      let pullDir = p5.Vector.sub(person, people[other]);
      if (pullDir.mag() > 0) {
        pullDir.setMag(0.3);
        person.add(pullDir);
        people[other].sub(pullDir);
      }
    } else {
      // Normal state: dog stays relaxed near owner
      let toOwner = p5.Vector.sub(person, dog).mult(0.02);
      dog.add(toOwner);
      if (random() < 0.2) {
        dog.add(p5.Vector.random2D().mult(0.5));
      }
    }

    // Enforce fixed leash length
    let dir = p5.Vector.sub(dog, person);
    if (dir.mag() > leashLength) {
      dir.setMag(leashLength);
      dog = p5.Vector.add(person, dir);
      dogs[i] = dog;
    }

    // Avoid bushes for both
    avoidBush(person);
    avoidBush(dog);

    // Draw leash
    stroke(80);
    strokeWeight(2);
    line(person.x, person.y, dog.x, dog.y);

    // Draw person
    fill(120,160,20);
    noStroke();
    ellipse(person.x, person.y, 20,20);

    // Draw dog
    fill(230, 160, 50);
    ellipse(dog.x, dog.y, 12, 12);
  }
}

function drawBushes() {
  fill(360, 360, 90);
  noStroke();
  for (let b of bushes) rect(b.x, b.y, b.w, b.h, 10);
}

// 🚫 Prevent entering bushes
function avoidBush(entity) {
  for (let b of bushes) {
    if (
      entity.x > b.x &&
      entity.x < b.x + b.w &&
      entity.y > b.y &&
      entity.y < b.y + b.h
    ) {
      // Calculate push direction (from bush center to entity)
      let center = createVector(b.x + b.w / 2, b.y + b.h / 2);
      let push = createVector(entity.x - center.x, entity.y - center.y);
      push.setMag(4); // push force
      entity.x += push.x;
      entity.y += push.y;
    } else {
      // If close to bush edge, steer away
      let dx = constrain(entity.x, b.x, b.x + b.w);
      let dy = constrain(entity.y, b.y, b.y + b.h);
      let distEdge = dist(entity.x, entity.y, dx, dy);
      if (distEdge < 20) {
        let push = createVector(entity.x - dx, entity.y - dy);
        push.setMag(map(distEdge, 0, 20, 2, 0));
        entity.x += push.x;
        entity.y += push.y;
      }
    }
  }
}

// 🖱️ Drag people manually
function mousePressed() {
  for (let i = 0; i < people.length; i++) {
    let p = people[i];
    if (dist(mouseX, mouseY, p.x, p.y) < 20) {
      selectedPerson = i;
      offset = createVector(p.x - mouseX, p.y - mouseY);
      break;
    }
  }
}

function mouseDragged() {
  if (selectedPerson !== null) {
    people[selectedPerson].x = mouseX + offset.x;
    people[selectedPerson].y = mouseY + offset.y;
  }
}

function mouseReleased() {
  selectedPerson = null;
}
