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
        const lengthSection = document.createElement("div");
        lengthSection.className = "input-section";
        const lengthLabel = document.createElement("label");
        lengthLabel.textContent = `Longueur ${i} (m)`;
        lengthLabel.setAttribute("for", `length${i}`);
        lengthSection.appendChild(lengthLabel);
        const lengthInput = document.createElement("input");
        lengthInput.type = "number";
        lengthInput.id = `length${i}`;
        lengthInput.placeholder = "Longueur";
        lengthSection.appendChild(lengthInput);
        row.appendChild(lengthSection);

        const separator1 = document.createElement("div");
        separator1.className = "separator";
        row.appendChild(separator1);

        const widthSection = document.createElement("div");
        widthSection.className = "input-section";
        const widthLabel = document.createElement("label");
        widthLabel.textContent = `Largeur ${i} (m)`;
        widthLabel.setAttribute("for", `width${i}`);
        widthSection.appendChild(widthLabel);
        const widthInput = document.createElement("input");
        widthInput.type = "number";
        widthInput.id = `width${i}`;
        widthInput.placeholder = "Largeur";
        widthSection.appendChild(widthInput);
        row.appendChild(widthSection);

        const separator2 = document.createElement("div");
        separator2.className = "separator";
        row.appendChild(separator2);

        const areaSection = document.createElement("div");
        areaSection.className = "input-section";
        const areaLabel = document.createElement("label");
        areaLabel.textContent = `Surface ${i} (m²) (optionnel)`;
        areaLabel.setAttribute("for", `area${i}`);
        areaSection.appendChild(areaLabel);
        const areaInput = document.createElement("input");
        areaInput.type = "number";
        areaInput.id = `area${i}`;
        areaInput.placeholder = "Surface";
        areaSection.appendChild(areaInput);
        row.appendChild(areaSection);

        container.appendChild(row);

        if (i < numSurfaces) {
            const separator = document.createElement("hr");
            container.appendChild(separator);
        }
    }
});


document.getElementById("calculateParquet").addEventListener("click", () => {
    const length = parseFloat(document.getElementById("parquetLength").value);
    const width = parseFloat(document.getElementById("parquetWidth").value);
    const area = parseFloat(document.getElementById("parquetArea").value);
    const packageArea = parseFloat(document.getElementById("parquetPackageArea").value);

    if (isNaN(length) || isNaN(width) || isNaN(packageArea)) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }

    const calculatedArea = length * width;
    const numberOfPackages = Math.ceil(calculatedArea / packageArea);

    document.getElementById("parquetPerimeter").textContent = `Périmètre : ${2 * (length + width).toFixed(2)} m`;
    document.getElementById("parquetPackages").textContent = `Nombre de paquets nécessaires : ${numberOfPackages}`;
    document.getElementById("parquetUnderlayer").textContent = `Sous-couche nécessaire : ${calculatedArea.toFixed(2)} m²`;

});

document.getElementById("calculateCarrelage").addEventListener("click", () => {
    const numSurfaces = parseInt(document.getElementById("numSurfaces").value);
    const packageArea = parseFloat(document.getElementById("carrelagePackageArea").value);
    const plinthLength = parseFloat(document.getElementById("plinthLength").value) || 0;

    if (isNaN(packageArea)) {
        alert("Veuillez remplir l'air de la botte.");
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


document.getElementById("calculateParquet").addEventListener("click", () => {
    const length = parseFloat(document.getElementById("parquetLength").value) || 0;
    const width = parseFloat(document.getElementById("parquetWidth").value) || 0;
    const area = parseFloat(document.getElementById("parquetArea").value) || 0;
    const packageArea = parseFloat(document.getElementById("parquetPackageArea").value) || 0;

    const perimeter = 2 * (length + width);
    document.getElementById("parquetPerimeter").textContent = `Périmètre : ${perimeter.toFixed(2)} m`;

    const plinthLength = 2.4;
    const numPlinths = Math.ceil(perimeter / plinthLength);
    document.getElementById("parquetPlinths").textContent = `Nombre de plinthes nécessaires : ${numPlinths}`;

    if (packageArea > 0) {
        const totalArea = length * width;
        const numPackages = Math.ceil(totalArea / packageArea);
        document.getElementById("parquetPackages").textContent = `Nombre de bottes nécessaires : ${numPackages}`;
    } else {
        document.getElementById("parquetPackages").textContent = "Veuillez entrer l'air d'une botte pour calculer le nombre de paquets.";
    }
});


