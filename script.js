// Supabase Setup
const supabaseUrl = "https://xzatttpouvlhqzbuwgmc.supabase.co";
const supabaseAnonKey = "YOUR_ANON_KEY_HERE"; // Use your actual key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Load Gallery
async function loadGallery() {
    try {
        // Get list of images
        const { data, error } = await supabaseClient.storage.from("photos").list("", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" }
        });

        if (error) {
            console.error("Gallery Load Error:", error);
            return;
        }

        const galleryDiv = document.getElementById("gallery");
        galleryDiv.innerHTML = "";

        data.forEach(file => {
            const imgUrl =
                `${supabaseUrl}/storage/v1/object/public/photos/${file.name}`;

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = file.name;
            img.className = "gallery-image";

            galleryDiv.appendChild(img);
        });

    } catch (err) {
        console.error("Unexpected Error:", err);
    }
}

loadGallery();
