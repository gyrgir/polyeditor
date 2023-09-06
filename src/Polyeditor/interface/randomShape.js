function randomInt(begin, end) {
    const size = end - begin;
    return begin + Math.floor(Math.random() * size);
}

function randomChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

function randomShape(minOperations=2, maxOperations=5) {
    const opCount = randomInt(minOperations, maxOperations+1);
    let shape = new Array(opCount + 1);
    for (let i = 0; i < opCount; i += 1) {
        shape[i] = randomChoice("adkbejmnotz");
    }
    shape[opCount] = randomChoice("TCODI");
    return shape.join('');
}

export { randomShape };