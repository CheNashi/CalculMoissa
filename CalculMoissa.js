// Gestion des boutons pour afficher les sections
document.getElementById("parquetBtn").addEventListener("click", () => showSection("parquet"));
document.getElementById("carrelageBtn").addEventListener("click", () => showSection("carrelage"));

function showSection(type) {
    document.getElementById("parquetSection").classList.add("hidden");
    document.getElementById("carrelageSection").classList.add("hidden");

    if (type === "parquet") {
        document.getElementById("parquetSection").classList.remove("hidden");
    } else if (type === "carrelage") {
        document.getElementById("carrelageSection").classList.remove("hidden");
    }
}


document.getElementById("generateSurfaceInputs").addEventListener("click", () => {
    const numSurfaces = parseInt(document.getElementById("numSurfaces").value) || 0;
    const container = document.getElementById("surfaceInputs");
    container.innerHTML = "";

    for (let i = 1; i <= numSurfaces; i++) {
        const row = document.createElement("div");
        row.className = "input-row";

        const lengthSection = createInputSection(`Longueur ${i} (m)`, `length${i}`, "number", "Longueur");
        row.appendChild(lengthSection);

        const widthSection = createInputSection(`Largeur ${i} (m)`, `width${i}`, "number", "Largeur");
        row.appendChild(widthSection);

        const areaSection = createInputSection(`Surface ${i} (m²) (optionnel)`, `area${i}`, "number", "Surface");
        row.appendChild(areaSection);

        container.appendChild(row);

        if (i < numSurfaces) {
            const separator = document.createElement("hr");
            container.appendChild(separator);
        }
    }
});

function createInputSection(labelText, inputId, inputType, placeholderText) {
    const section = document.createElement("div");
    section.className = "input-section";

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", inputId);
    section.appendChild(label);

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.placeholder = placeholderText;
    section.appendChild(input);

    return section;
}

document.getElementById("calculateParquet").addEventListener("click", () => {
    const length = parseFloat(document.getElementById("parquetLength").value);
    const width = parseFloat(document.getElementById("parquetWidth").value);
    const area = parseFloat(document.getElementById("parquetArea").value);
    const packageArea = parseFloat(document.getElementById("parquetPackageArea").value);

    let calculatedArea;
    let perimeter;

    if (!isNaN(length) && !isNaN(width)) {
        calculatedArea = length * width;
        perimeter = 2 * (length + width);
    } else if (!isNaN(area)) { 
        calculatedArea = area;
        const side = Math.sqrt(area); 
        perimeter = 4 * side;
    } else {
        alert("Veuillez remplir soit la longueur et la largeur, soit l'aire.");
        return;
    }

    if (isNaN(packageArea) || packageArea <= 0) {
        alert("Veuillez entrer une surface par paquet valide.");
        return;
    }

    const numberOfPackages = Math.ceil(calculatedArea / packageArea);
    const plinthLength = 2.4; // Longueur d'une plinthe standard
    const numberOfPlinths = Math.ceil(perimeter / plinthLength);

    document.getElementById("parquetPerimeter").textContent = `Périmètre : ${perimeter.toFixed(2)} m`;
    document.getElementById("parquetPackages").textContent = `Nombre de paquets nécessaires : ${numberOfPackages}`;
    document.getElementById("parquetUnderlayer").textContent = `Sous-couche nécessaire : ${calculatedArea.toFixed(2)} m²`;
    document.getElementById("parquetPlinths").textContent = `Nombre de plinthes nécessaires : ${numberOfPlinths}`;
});

document.getElementById("calculateCarrelage").addEventListener("click", () => {
    const numSurfaces = parseInt(document.getElementById("numSurfaces").value);
    const packageArea = parseFloat(document.getElementById("carrelagePackageArea").value);
    const plinthLength = parseFloat(document.getElementById("plinthLength").value) || 0;

    if (isNaN(packageArea)) {
        alert("Veuillez remplir la surface par paquet.");
        return;
    }

    let totalArea = 0;
    let totalPerimeter = 0;

    for (let i = 1; i <= numSurfaces; i++) {
        const length = parseFloat(document.getElementById(`length${i}`).value);
        const width = parseFloat(document.getElementById(`width${i}`).value);
        const area = parseFloat(document.getElementById(`area${i}`).value);

        if (!isNaN(area)) {
            totalArea += area;
        } else if (!isNaN(length) && !isNaN(width)) {
            totalArea += length * width;
        } else {
            alert("Veuillez entrer la longueur et la largeur ou la surface pour chaque surface.");
            return;
        }

        totalPerimeter += 2 * (length + width);
    }

    const numberOfPackages = Math.ceil(totalArea / packageArea);

    // Mise à jour de l'affichage
    document.getElementById("carrelageTotalArea").textContent = `Surface totale : ${totalArea.toFixed(2)} m²`;
    document.getElementById("carrelagePerimeters").textContent = `Périmètre total : ${totalPerimeter.toFixed(2)} m`;
    document.getElementById("carrelagePackages").textContent = `Nombre de paquets nécessaires : ${numberOfPackages}`;

    if (plinthLength > 0) {
        const numberOfPlinths = Math.ceil(totalPerimeter / plinthLength);
        document.getElementById("carrelagePlinths").textContent = `Plinthes nécessaires : ${numberOfPlinths}`;
    } else {
        document.getElementById("carrelagePlinths").textContent = "Veuillez entrer la longueur d'une plinthe pour calculer le nombre de plinthes nécessaires.";
    }
});
