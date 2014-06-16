<?php

/**
 *
 * A PHP mailer class for forms
 *
**/

// Prevent direct access to the file.
if(!empty($_SERVER['SCRIPT_FILENAME']) && 'mailer.php' === basename($_SERVER['SCRIPT_FILENAME'])){
    die('Sorry. This page cannot be loaded directly.');
}

class mailer{

	public $response;

	/**
	 * __construct
	 * Class constructor.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $type - String. Either 'mail', 'login', 'account', 'register'. Default: 'mail'.
	 * @param $json - Boolean. Return a JSON response, otherwise return PHP string. Default: false.
	**/
	public function __construct($type = 'mail', $field_id = 'field', $args = array(), $json = false){
        // Response array
        $this->response = array();
        // Action the form
        $this->process($field_id, $args);
	}

	/**
	 * process
	 * Process the form or return a response
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $field_id - String. ID of the fields.
	 * @param $args - Array.
	**/
	public function process($field_id, $args){
		// Get response
		$response = $this->process_fields();
		// If we have a response return it
		if($response['error']){
			// Ajax
			if(isset($_POST['ajaxrequest'])){
			    echo json_encode($response);
			    exit;
			}
			// PHP
			else{
				unset($response[0]);
				foreach($response as $error){
					echo $error['msg'] . '<br>';
				}
				exit;
			}
		}
		// If ok send!
		else{
			$this->{$type}($field_id, $args);
		}
	}

	/**
	 * process_fields
	 * Validates and sanitizes post data and puts into an array.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $id - String. Post field parameter.
	**/
	public function process_fields($id){
		// Success var
		$success = true;
		// Functions
		function return_field($key, $value){
			return (!is_array($value)) ? 'field[' . $key . ']' : 'field[' . $key . '][]';
		}
		function safe_key($value){
			return str_replace('-', '_', $value);
		}
		function check_email($value){
			return (filter_var($value, FILTER_VALIDATE_EMAIL)) ? $value : false;
		}
		function check_url($value){
			return (filter_var($value, FILTER_VALIDATE_URL)) ? $value : false;
		}
		function check_password($value){
			return (preg_match('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/', $value)) ? $value : false;
		}
		function check_password_confirmation($value){
			//return () ? $value : false;
		}
		function check_captcha($value){
			return (strtolower($value) === 'hot') ? $value : false;
		}
		function check_array($value){
			if(is_array($value)){
				// Check for a dummy value and unset
				if(isset($value['dummy'])){unset($value['dummy']);}
				// Check existence
				if(!empty($value)){
					// Value must be serialized for WordPress DB function
					return serialize($value);
				}
			}
			return false;
		}
		function check_existence($value){
			return (!empty($value)) ? strip_tags($value) : false;
		}
		// Cycle through fields
		foreach($_POST[$id] as $key=>$value){
			$valid = true;
			if(isset($_POST['validationfilter'][$key])){
				$include = true;
				// Check method
				switch($_POST['validationfilter'][$key]){
					case 'existence':
						$valid = check_existence($value);
					break;
					case 'email':
						$valid = check_email($value);
					break;
					case 'url':
						$valid = check_url($value);
					break;
					case 'password':
						$valid = check_password($value);
					break;
					case 'password_confirmation':
						$valid = check_password_confirmation($value);
						$include = false;
					break;
					case 'captcha':
						$valid = check_captcha($value);
						$include = false;
					break;
					case 'array':
						$valid = check_array($value);
					break;
				}
			}
			// Field is valid
			if($valid){
				// If this needs to be included in the field_array
				if($include){
					$fields[safe_key($key)] = $value;
				}
			}
			// Field is not valid
			elseif(!empty($_POST['validationmessage'][$key])){
				$success = false;
				$this->response['error']['msg'][] = $_POST['validationmessage'][$key];
			}
		}

		return ($success) ? $fields : false;
	}

	/**
	 * mail
	 * Method for dealing with mail forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $id - String. Post field parameter.
	 * @param $args - Array. Settings.
	**/
	public function mail($id, $args){
		// Check form is posted.
		if(!isset($_POST[$id])){ return; }

		/**
		 * get_domain
		 * Parses a URL for the domain
		 *
		 * @since 1.0.0
		 * @version 1.0.0
		 * @uses
		**/
		function get_domain($URL){
	        $pieces = parse_url($URL);
	        $domain = isset($pieces['host']) ? $pieces['host'] : null;
	        if(preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)){
	            return $regs['domain'];
	        }

	        return false;
		}

		/**
		 * get_mail_headers
		 * Get email headers.
		 *
		 * @since 1.0.0
		 * @version 1.0.0
		**/
		function get_mail_headers($args){
			$headers['headers']  = 'MIME-Version: 1.0' . "\n";
			$headers['headers'] .= 'Content-type: text/html; charset=UTF-8' . "\n";
			$headers['headers'] .= 'From: ' . $args['title'] . ' <noreply@' . get_domain($args['domain']) . '>' . "\n";
			$headers['headers'] .= 'Reply-To: test <' . $args['reply-to'] . '>' . "\n";

			return $headers;
		}

		// Fields
		$fields = $this->process_fields($id);
		// If fields is valid
		if($fields){
			// Recipient
			$recipient            = $args['recipient'];
			// Subject
			$subject              = $args['subject'];
			// Headers
			$headers              = get_mail_headers($args);
			// Add date and time to array
			$fields['date_sent']  = date('d/m/Y | H:i:s');
			// Add IP address to array
			$fields['ip_address'] = $_SERVER['REMOTE_ADDR'];
			// Remove Form ID
			unset($fields['form_ID']);
			// Message
			$message   = '
				<html>
				<head>
				    <style type="text/css">
				    .ReadMsgBod     {width: 100%;}
				    .ExternalClass  {width: 100%;}
				    body            {font-family: Arial; font-size: 12px; line-height: 16px; -webkit-text-size-adjust: none; margin: 0; padding: 0;}
				    img             {display: block;}
				    table           {border-collapse: collapse;}
				    td              {padding: 5px;}
				    </style>
				</head>
				<body>
	    			<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">';
			    		$i = 0;
				    	foreach($fields as $k=>$v){
							$array = @unserialize($v);
							if($array === false && $v !== 'b:0;'){
							}
							else{
								$v_array = unserialize($v);
								$v = implode('<br>', $v_array);
							}

							$bgcolor = ($i % 2 == 0) ? '#FFFFFF' : '#F2EFEF';

				    		$message .= '
				    		<tr height="25" style="background: ' . $bgcolor . '">
					    		<td valign="top" style="padding: 3px;"><strong>' . ucwords(str_replace('_', ' ', $k)) . ':</strong></td>
					    		<td width="5"></td>
					    		<td valign="top" style="padding: 3px;">' . $v . '</td>
				    		</tr>';

				    		$i++;
				    	}
	    	$message .= '
				    </table>
				</body>
			</html>';

			// Send the email
			if(@mail($recipient, $subject, $message, $headers['headers'])){
				$this->response['success']['msg'][] = 'Mail sent';
			}
			else {
				$this->response['error']['msg'][] = 'Mail sending failed';
			}
		}
	}

	/**
	 * login
	 * Method for dealing with login forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $id - String. Post field parameter.
	 * @param $args - Array. Settings.
	**/
	public function login($id, $args){
	}

	/**
	 * account
	 * Method for dealing with account forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $id - String. Post field parameter.
	 * @param $args - Array. Settings.
	**/
	public function account($id, $args){
	}

	/**
	 * register
	 * Method for dealing with register forms.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 * @param $id - String. Post field parameter.
	 * @param $args - Array. Settings.
	**/
	public function register($id, $args){
	}

	/**
	 * response
	 * Returns a final response either in PHP or JSON format.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	public function response(){
		// Get response
		if($this->response){
			foreach($this->response as $k=>$v) : ?>
				<div class="alert box <?php echo $k; ?>"><?php echo implode('<br>', $v['msg']); ?></div>
			<?php endforeach;
		}
	}

}

?>