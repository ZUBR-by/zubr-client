export const Pattern: { [key: string]: RegExp } = {
  DigitsOnly: new RegExp(/^([0-9]*)$/),
  PositiveDigitsOnly: new RegExp(/^\+?([0-9]*)$/),
  DecimalOnly: new RegExp(/^-?\d+\.?\d*$/),
  PhoneNumber: new RegExp(/^([0-9+_/\s-]*)$/),
  CyrillicOnly: new RegExp(/^[-аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/),
};
