var GefilterteFarbenListe = React.createClass({
    getInitialState: function() {
        return { filter: '' };
    },
    
    handleFilterChange: function(filter) {
        this.setState({filter: filter});
    },
    
    render: function() {
        return (
            <div>
                <SuchFeld filter={this.state.filter} onUserInput={this.handleFilterChange} />
                <FarbenListe farben={this.props.farben} filter={this.state.filter} />
            </div>
        )
    }
});

var SuchFeld = React.createClass({
    handleFilterChange: function(e) {
        this.props.onUserInput(
            this.refs.filterTextInput.value
        )
    },
    
    render: function() {
        return (
            <form>
                <input type="text" 
                       placeholder="Filter nach..."
                       value={this.props.filter}
                       ref="filterTextInput" 
                       onChange={this.handleFilterChange} />
            </form>
        );
    }
});

var FarbenListe = React.createClass({
    contains: function(string, contains) {
        return (string.indexOf(contains) !== -1);
    },
    
    includeRow: function(zeile) {
        if(this.props.filter == "") {
            return true;
        }
        return this.contains(zeile.kategorie, this.props.filter) 
            || this.contains(zeile.bezeichnung, this.props.filter)
            || this.contains(zeile.einzelpreis, this.props.filter)
            || this.contains(zeile.hersteller, this.props.filter)
            || this.contains(zeile.herkunft, this.props.filter);
    },
    
    render: function() {
        var zeilen = this.props.farben.filter(this.includeRow).map(function(farbe) {
            return (
                <FarbenZeile farbe={farbe} />
            );
        });

        return (
            <table className="backzutatenTable">
                <thead>
                    <tr>
                        <th>Kategorie</th>
                        <th>Bezeichnung</th>
                        <th>Einzelpreis</th>
                        <th>Hersteller</th>
                        <th>Herkunft</th>
                        <th>Menge</th>
                        <th>Anzahl pro Einheit</th>
                        <th>Einheit</th>
                    </tr>
                </thead>
                <tbody>
                    { zeilen }
                </tbody>
            </table>
        );
    }
});

var FarbenZeile = React.createClass({
    render: function() {
        return (
            <tr>
                <td className="kategorie">{this.props.farbe.kategorie}</td>
                <td className="bezeichnung">{this.props.farbe.bezeichnung}</td>
                <td className="einzelpreis">{this.props.farbe.einzelpreis}</td>
                <td className="hersteller">{this.props.farbe.hersteller}</td>
                <td className="herkunft">{this.props.farbe.herkunft}</td>
                <td className="menge">{this.props.farbe.menge}</td>
                <td className="anzahlProEinheit">{this.props.farbe.anzahlProEinheit}</td>
                <td className="einheit">{this.props.farbe.einheit}</td>
            </tr>
        );
    }
});

var FARBEN = [
    {
        id : 1, 
        kategorie : 'Pastenfarbe', 
        bezeichnung : 'azurblau', 
        einzelpreis : '3,40 €', 
        hersteller : 'Pati Versand', 
        herkunft : 'Pati Versand', 
        menge : 1,
        anzahlProEinheit : 1,
        einheit : 'Stück'
    },
    {
        id : 2, 
        kategorie : 'Pastenfarbe', 
        bezeichnung : 'sonnengelb', 
        einzelpreis : '3,40 €', 
        hersteller : 'Pati Versand', 
        herkunft : 'Pati Versand', 
        menge : 1,
        anzahlProEinheit : 1,
        einheit : 'Stück'
    },
    {
        id : 2, 
        kategorie : 'Glitzer', 
        bezeichnung : 'neongelb', 
        einzelpreis : '3,00 €', 
        hersteller : 'keine Ahnung', 
        herkunft : 'Cake and Bake', 
        menge : 1,
        anzahlProEinheit : 1,
        einheit : 'Stück'
    }
];

ReactDOM.render(
    <GefilterteFarbenListe farben={ FARBEN } />,
    document.getElementById('farbenListe')
)