
function fetchMarsPhotos() {
    const apiKey = 'I5cV3zA2UAbHeAk72z1UlFGp9sIJIr2VM5f2kMf2';
    const endpoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
    const solInput = document.getElementById('solInput').value;
    const camera = 'fhaz';
    const params = new URLSearchParams({
        sol: solInput,
        camera: camera,
        api_key: apiKey,
        
    });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${endpoint}?${params.toString()}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const marsImagesContainer = document.getElementById('marsImagesContainer');
            const earthDateContainer = document.getElementById('earthDateContainer');
            const roverNameContainer = document.getElementById('roverNameContainer');
            const roverLandingContainer = document.getElementById('roverLandingContainer');
            const roverLaunchContainer = document.getElementById('roverLaunchContainer');
            const cameraNameContainer = document.getElementById('cameraNameContainer');
            const statusContainer = document.getElementById('statusContainer');
            marsImagesContainer.innerHTML = ''; // Clear previous images
            earthDateContainer.innerHTML = '';
            roverNameContainer.innerHTML = '';
            roverLandingContainer.innerHTML = '';
            roverLaunchContainer.innerHTML = '';
            cameraNameContainer.innerHTML = '';
            statusContainer.innerHTML = '';
            
            // Loop through the photos array and create an img element for each photo
            if (data.photos.length > 0) {
                const firstPhoto = data.photos[0];
                const imgSrc = firstPhoto.img_src;

                // Create and append img element to the container
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.alt = 'Mars Rover Photo';
                imgElement.width = 500;
                marsImagesContainer.appendChild(imgElement);

                const ymd = firstPhoto.earth_date;
                const pElement = document.createElement('p');
                pElement.innerText = ymd;
                earthDateContainer.appendChild(pElement);

                const rn = firstPhoto.rover.name;
                const pElement2 = document.createElement('p');
                pElement2.innerText = rn;
                roverNameContainer.appendChild(pElement2);

                const touchDown = firstPhoto.rover.landing_date;
                const pElement3 = document.createElement('p');
                pElement3.innerText = touchDown;
                roverLandingContainer.appendChild(pElement3);

                const takeOff = firstPhoto.rover.launch_date;
                const pElement4 = document.createElement('p');
                pElement4.innerText = takeOff;
                roverLaunchContainer.appendChild(pElement4);

                const camNam = firstPhoto.rover.cameras[0].full_name;
                const pElement5 = document.createElement('p');
                pElement5.innerText = camNam;
                cameraNameContainer.appendChild(pElement5);

                const status = firstPhoto.rover.status;
                const pElement6 = document.createElement('p');
                pElement6.innerText = status;
                statusContainer.appendChild(pElement6);

            }else {
                // Display a message when no photos are available
                const noPhotosMessage = document.createElement('p');
                const statusMessage = document.createElement('p');
                const batteryStatusNoPhotos = document.createElement('p');
                const batteryStatusEarthDate = document.createElement('p');
                const batteryStatusRoverName = document.createElement('p');
                const batteryStatusRoverLanding = document.createElement('p');
                const batteryStatusRoverLaunch = document.createElement('p');
                const batteryStatusCameraName = document.createElement('p');
                noPhotosMessage.innerText = 'No photos available from this solar day.';
                statusMessage.innerText = 'ASLEEP ZZzzzzZZ';
                batteryStatusNoPhotos.innerText = 'CHARGING... cannot compute.';
                batteryStatusEarthDate.innerText = 'CHARGING... cannot compute.';
                batteryStatusRoverName.innerText = 'CHARGING... cannot compute.';
                batteryStatusRoverLanding.innerText = 'CHARGING... cannot compute.';
                batteryStatusRoverLaunch.innerText = 'CHARGING... cannot compute.';
                batteryStatusCameraName.innerText = 'CHARGING... cannot compute.';
                marsImagesContainer.appendChild(noPhotosMessage);
                earthDateContainer.appendChild(batteryStatusEarthDate);
                roverNameContainer.appendChild(batteryStatusRoverName);
                roverLandingContainer.appendChild(batteryStatusRoverLanding);
                roverLaunchContainer.appendChild(batteryStatusRoverLaunch);
                cameraNameContainer.appendChild(batteryStatusCameraName);
                statusContainer.appendChild(statusMessage);
            };
        })

       .catch(error => console.error('Error:', error.message));



}

// Fetch photos when the page loads
fetchMarsPhotos();