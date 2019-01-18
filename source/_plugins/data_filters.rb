module Jekyll
  module DataFilters

    def find_data_reference_by_id(dataset, id, referenceField)
      data = []
      dataset.map do |data_target|
        unless data_target[referenceField].nil?
          data_target[referenceField].select do |ref|
            if ref['sys']['id'] == id
              data << data_target
            end
          end
        end
      end
        return data
    end

    def find_upcoming_data(dataset, dateField)
      data = []
      dataset.map do | data_target |
        if !data_target['selfPaced'].nil? && data_target['selfPaced']
          data << data_target
        end
        unless data_target[dateField].nil?
          if data_target[dateField] > Time.now
            data << data_target
          end
        end
      end
      return data
    end

    def find_past_data(dataset, dateField)
      data = []
      dataset.map do | data_target |
        unless data_target[dateField].nil?
          if data_target[dateField] < Time.now
            data << data_target
          end
        end
      end
      return data
    end

    def replace_diacritics(str)
      newstr = str.tr("ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÑñÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž","AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz").downcase.strip.gsub(' ', '-').gsub(/[^\w.-]/, '')
      return newstr
    end

  end
end

Liquid::Template.register_filter(Jekyll::DataFilters)