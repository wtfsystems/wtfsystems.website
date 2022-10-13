/*
 * Check to see if mobile device and return true if it is
 */
const checkDevice = () => {
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
		return true
	else
		return false
}

/*
 * Shows the navbar menu.  Only runs on mobile devices
 */
const showMenu = (elm) => {
	if(checkDevice()) {
		const menuItem = document.getElementById(`menu_list_${elm.id.slice(-1)}`)
		if(menuItem.style.display == "none") menuItem.style.display = "block"
		else menuItem.style.display = "none"
	}
}