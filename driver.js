// Initialize Supabase client
const { createClient } = supabase;

const SUPABASE_URL = "https://hhyfkuwwkhjbekflekie.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeWZrdXd3a2hqYmVrZmxla2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMTk3MDEsImV4cCI6MjA1NTU5NTcwMX0.AxEx2nG9X4Yh2ihxaM0TJE05FeXsKjcteNWi-dDq3pM"; // Replace with your actual anon key

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to update bus location
async function updateBusLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(`Updating location: Latitude ${lat}, Longitude ${lng}`);

        const { error } = await supabaseClient
            .from("bus_location")
            .update({ latitude: lat, longitude: lng, updated_at: new Date().toISOString() })
            .eq("id", 1); // Ensure this matches the correct row ID

        if (error) {
            console.error("Error updating location:", error);
            alert(`Error updating location: ${JSON.stringify(error)}`);
        } else {
            alert("Bus location updated successfully!");
        }
    }, (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get location. Please allow location access.");
    });
}

