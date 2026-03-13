function WebsiteSelector({ websites, onSelect }){
    return(
        <div>
            <h3>Select Website</h3>

            <select onChange={(e) => onSelect(websites[e.target.value])}>
                <option>Select</option>
                {websites.map((website,i) => (
                    <option key = {website._id} value={i}>{website.name}</option>
                ))}
            </select>
        </div>
    );
};

export default WebsiteSelector;