const knownShapes = {
    // Platoninc solids
    T: "tetrahedron",
    C: "cube",
    O: "octahedron",
    D: "dodecahedron",
    I: "icosahedron",
    // Archimedean solids
    tT: "truncated tetrahedron",
    aO: "cuboctahedron",
    tC: "truncated cube",
    tO: "truncated octahedron",
    eC: "rhombicuboctahedron",
    bC: "truncated cuboctahedron",
    //sD: : "snub cube",
    aD: "icosidodecahedron",
    tD: "truncated dodecahedron",
    tI: "truncated icosahedron",
    eD: "rhombicosidodecahedron",
    bD: "truncated icosidodecahedron",
    //sD: "snub dodecahedron",
    // Catalan solids
    kT: "triakis tetrahedron",
    jC: "rhombic dodecahedron",
    kO: "triakis octahedron",
    kC: "tetrakis hexahedron",
    oC: "deltoidal icositetrahedron",
    mC: "disdyakis dodecahedron",
    //gC: "pentagonal icositetrahedron",
    jD: "rhombic triacontahedron",
    kI: "triakis icosahedron",
    kD: "pentakis dodecahedron",
    oD: "deltoidal hexecontahedron",
    mD: "disdyakis triacontahedron",
    //gD: "pentagonal hexecontahedron"
}

const eq3 = {
    // Catalan solids as Archimedean duals
    dtT: "kT",
    daO: "jC",
    dtC: "kO",
    dtO: "kC",
    deC: "oC",
    dbC: "mC",
    daD: "jD",
    // Archimedean solid variants
    aaO: "eC",
    taO: "bC",
    aaD: "eD",
    taD: "bD",
    //dsC: "gC",
    dtD: "kI",
    dtI: "kD",
    deD: "oD",
    dbD: "mD",
    //dsD: "gD"
}

const equivalences = {
    dT: "T",
    dO: "C",
    dC: "O",
    aT: "O",
    dI: "D",
    dD: "I",
    // Archimedean solid variants
    aC: "aO",
    bT: "tO"
}

function getName(code) {
    let part = code.slice(-2);
    while (Object.hasOwn(equivalences, part)) {
        code = code.slice(0, -2) + equivalences[part];
        part = code.slice(-2);
    }

    part = code.slice(-3);
    while (Object.hasOwn(eq3, part)) {
        code = code.slice(0, -3) + eq3[part];
        part = code.slice(-3);
    }

    if (Object.hasOwn(knownShapes, code)) {
        return knownShapes[code];
    }
    return null;
}

export { getName };