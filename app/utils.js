import moment from "moment";
import 'moment/locale/ru' 

export default class Article {
    constructor(item, navigate){
        this.context = item.source.name;
		this.title = item.title;
		moment.locale('ru'); // 'fr'
        this.subtext = moment(item.publishedAt).fromNow();

        if (item.urlToImage) this.image = item.urlToImage;

        if (navigate) this.onPress = () => navigate("Article", {title: item.title, article: item});
    }
}