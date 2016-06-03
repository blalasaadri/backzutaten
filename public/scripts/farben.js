var FarbenListe = React.createClass({
    render: function() {
        return (
            <span>Hallo, Welt!</span>
        );
    }
});

var FARBEN = [
    {}
];

ReactDOM.render(
    <FarbenListe farben="{FARBEN}" />,
    document.getElementById('content')
)