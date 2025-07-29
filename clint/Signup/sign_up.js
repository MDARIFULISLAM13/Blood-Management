// Form validation
const form = document.getElementById( "signupForm" );

form.addEventListener( "submit", async function ( e )
{
    e.preventDefault();

    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const retypePassword = form.retype_password.value;

    const isMobileValid = /^[0-9]{11}$/.test( mobile );
    const isEmailValid = email.endsWith( "@gmail.com" );

    if ( !isMobileValid )
    {
        alert( "Mobile number must be exactly 11 digits." );
        return;
    }

    // if ( !isEmailValid )
    // {
    //     alert( "Email must end with @gmail.com" );
    //     return;
    // }

    if ( password !== retypePassword )
    {
        alert( "Passwords do not match." );
        return;
    }

    const data = {};
    new FormData( form ).forEach( ( value, key ) => data[key] = value );

    try
    {
        const response = await fetch( "http://localhost:4341/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } );

        const result = await response.json();

        if ( response.ok )
        {
            localStorage.setItem( "email", data.Email );


            window.location.href = "../otp/otp_verify.html";

        } else
        {
            alert( result.message || "Something went wrong!" );
        }

    } catch ( error )
    {
        console.error( "Signup failed:", error );
        alert( "Signup failed. Try again later." );
    }

} );

// ========================
// বিভাগ, জেলা, উপজেলা লজিক
// ========================
let divisions = [];

const divisionSelect = document.getElementById( 'divisionSelect' );
const districtSelect = document.getElementById( 'districtSelect' );
const upazilaSelect = document.getElementById( 'upazilaSelect' );

function loadData()
{
    fetch( 'http://localhost:4341/api/location_data' )
        .then( res =>
        {
            if ( !res.ok ) throw new Error( 'Failed to load data' );
            return res.json();
        } )
        .then( jsonData =>
        {
            divisions = jsonData;
            populateDivisions();
        } )
        .catch( err =>
        {
            console.error( err );
            alert( 'Failed to load data' );
        } );
}

function populateDivisions()
{
    clearSelect( divisionSelect );
    addOption( divisionSelect, '', '-- Select a Division --' );
    divisions.forEach( div =>
    {
        addOption( divisionSelect, div.name, div.name );
    } );
    districtSelect.disabled = true;
    upazilaSelect.disabled = true;
    clearSelect( districtSelect );
    clearSelect( upazilaSelect );
}

function populateDistricts( divisionName )
{
    clearSelect( districtSelect );
    addOption( districtSelect, '', '-- Select a District --' );
    const division = divisions.find( d => d.name === divisionName );
    if ( division )
    {
        division.districts.forEach( dist =>
        {
            addOption( districtSelect, dist.name, dist.name );
        } );
        districtSelect.disabled = false;
    } else
    {
        districtSelect.disabled = true;
    }
    clearSelect( upazilaSelect );
    addOption( upazilaSelect, '', '-- Select an Upazila --' );
    upazilaSelect.disabled = true;
}

function populateUpazilas( divisionName, districtName )
{
    clearSelect( upazilaSelect );
    addOption( upazilaSelect, '', '- Select an Upazila --' );
    const division = divisions.find( d => d.name === divisionName );
    if ( division )
    {
        const district = division.districts.find( dist => dist.name === districtName );
        if ( district )
        {
            district.upazilas.forEach( upz =>
            {
                addOption( upazilaSelect, upz, upz );
            } );
            upazilaSelect.disabled = false;
        } else
        {
            upazilaSelect.disabled = true;
        }
    }
}

function clearSelect( selectElem )
{
    while ( selectElem.options.length > 0 )
    {
        selectElem.remove( 0 );
    }
}

function addOption( selectElem, value, text )
{
    const option = document.createElement( 'option' );
    option.value = value;
    option.text = text;
    selectElem.appendChild( option );
}

divisionSelect.addEventListener( 'change', e =>
{
    const selectedDivision = e.target.value;
    if ( selectedDivision )
    {
        populateDistricts( selectedDivision );
    } else
    {
        districtSelect.disabled = true;
        upazilaSelect.disabled = true;
        clearSelect( districtSelect );
        clearSelect( upazilaSelect );
    }
} );

districtSelect.addEventListener( 'change', e =>
{
    const selectedDistrict = e.target.value;
    const selectedDivision = divisionSelect.value;
    if ( selectedDistrict )
    {
        populateUpazilas( selectedDivision, selectedDistrict );
    } else
    {
        upazilaSelect.disabled = true;
        clearSelect( upazilaSelect );
    }
} );

//window.onload = loadData;
document.addEventListener( "DOMContentLoaded", loadData );
